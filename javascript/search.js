courseList = [] //niz kurseva

$(document).ready(function(){
    $("#search").click(function(){
        let search = document.getElementById("search-text").value;  //dohvata se tekst koji je korisnik ukucao kao parametar za pretragu
        let regex = new RegExp('(' + search + ')', 'ig');   //i od njega se pravi regex izraz
        let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

        let request = new XMLHttpRequest(); //pravljenje requesta

        courseList = []   //niz kurseva

        courses = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

        request.onreadystatechange = function (){  
            if (this.readyState == 4){
                if (this.status == 200){
                    document.getElementById('all-courses').innerHTML = "";
                
                    courses = JSON.parse(request.responseText);
                    
                    for (let i in courses){
                        courseList.push(courses[i])
                    }
                
                    for (let i in courseList){
                        if((courseList[i].naziv.match(regex)) || (courseList[i].kategorija.match(regex)) || (courseList[i].autor.match(regex))){        //ukoliko postoji parametar u nekom od ovih polja
                            let text1 = //izlistace se kartice sa bas tim parametrom
                            `
                                <div class="col-lg-3 col-md-4 mb-5 filter ${courseList[i].kategorija}">
                                    <div class="card h-100">
                                        <img class="card-img-top" src="${courseList[i].slika}">
                                        <div class="card-body d-flex flex-column">
                                            <h4 class="card-title">${courseList[i].naziv}</h4>
                                            <h6><b>Autor: </b>${courseList[i].autor}</h6>
                                            <h6><b>Kategorija: </b>${courseList[i].kategorija.split('_').join(" ")}</h6>
                            `;
                            let text2 =
                            `
                                            <p>
                                                ${courseList[i].opis.substring(0, 100) + '...'}
                                            </p>
                                            <div class="btn-toolbar mt-auto" role="toolbar">
                                                <a href="./course-profile.html?id=${courseList[i].id}" class="btn btn-dark mr-2">Start the course</a>
                                                <a href="./edit-course.html?id=${courseList[i].id}" class="btn btn-outline-dark">Edit</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                            let result = text1.replace(regex, `<mark>$1</mark>`);   //podvlace se sve reci koje se poklapaju sa parametrom
                            result += text2;
                            document.getElementById('all-courses').innerHTML += result;
                        }
                    }
                }
            }
        }

        request.open('GET', firebase + '/kursevi.json');  //slanje GET zahteva
        request.send();
    });
});