courseList = [];    //niz kurseva
x = null;   //sluzi za pamcenje kursa

$(document).ready(function(){
    let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url
    let request = new XMLHttpRequest(); //pravljenje requesta

    courseList = []   //niz korisnika

    courses = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

    request.onreadystatechange = function (){  
        if (this.readyState == 4){
            if (this.status == 200){
                
                courses = JSON.parse(request.responseText);   //users objekat prihvata odgovor sa servera u .json formatu
                
                let br = 0;
                for (let i in courses){   //iterira se kroz course objekat
                    if(br < 3){ //potrebna su samo tri kursa za pocetnu stranicu
                        courseList.push(courses[i]) //i kreira se niz kurseva (za laksi rad)
                        br++;
                    }
                    else{
                        break;  //kada se ucita 3 kursa, izlazi se iz petlje
                    }
                }
                
                document.getElementById("card-1-title").innerHTML = courseList[0].naziv;    //popunjavanje kartica kurseva na pocetnoj stranici
                document.getElementById("card-1-text").innerHTML = courseList[0].opis.substring(0, 300) + '...';
                document.getElementById("card-1-btn").href = "./pages/course-profile.html?id=" + courseList[0].id;
                document.getElementById("card-1-img").src = courseList[0].slika;
                document.getElementById("card-2-title").innerHTML = courseList[1].naziv;
                document.getElementById("card-2-text").innerHTML = courseList[1].opis.substring(0, 300) + '...';
                document.getElementById("card-2-btn").href = "./pages/course-profile.html?id=" + courseList[1].id;
                document.getElementById("card-2-img").src = courseList[1].slika;
                document.getElementById("card-3-title").innerHTML = courseList[2].naziv;
                document.getElementById("card-3-text").innerHTML = courseList[2].opis.substring(0, 300) + '...';
                document.getElementById("card-3-btn").href = "./pages/course-profile.html?id=" + courseList[2].id;
                document.getElementById("card-3-img").src = courseList[2].slika;
            }
        }
    }

    request.open('GET', firebase + '/kursevi.json');  //slanje GET zahteva
    request.send();

});