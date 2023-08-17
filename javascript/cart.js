courseList = [] //lista svih kurseva

$(document).ready(function(){
    let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

    let request = new XMLHttpRequest(); //pravljenje requesta

    courseList = []   //niz korisnika

    courses = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

    request.onreadystatechange = function (){  
        if (this.readyState == 4){
            if (this.status == 200){
                
                courses = JSON.parse(request.responseText);   //users objekat prihvata odgovor sa servera u .json formatu

                for (let i in courses){   //iterira se kroz users objekat
                    if(courseList.length < 3){  //i uzima samo 3 kursa
                        courseList.push(courses[i]);    //ubacuje kurseve u novi niz
                    }
                    else
                        break;  //kada prodje 3 kursa, izlazi iz petlje
                }

                let table = document.getElementById("table");   //dohvata tabelu
                let total = 0;  //suma
                for(let i = 0; i < courseList.length; i++){ //petlja kojom se ubacuju kursevi u tabelu
                    table.rows[i + 1].cells[0].innerHTML = `
                        <img src="${courseList[i].slika}">
                        <span class="h6 ml-lg-2 ml-md-2">${courseList[i].naziv}</span>
                    `;
                    table.rows[i + 1].cells[1].innerHTML = `
                        <span class="h6">${courseList[i].prosecnaOcena}</span>
                    `;
                    table.rows[i + 1].cells[2].innerHTML = `
                        <span class="h6"><b><i>$${Math.round(courseList[i].cena / 100)}</i></b></span>
                    `;
                    total += Math.round(courseList[i].cena / 100);
                }

                document.getElementById("total").innerHTML += `$${total}`;
            }
        }
    }

    request.open('GET', firebase + '/kursevi.json');  //slanje GET zahteva
    request.send();
});