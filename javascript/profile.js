userList = [];  //lista svih korisnika
userIDList = [];    //lista kjuceva svih korisnika
courseList = [];    //lista svih kurseva
x = null;   //sluzi za pamcenje korisnika
y = null;   //sluzi za pamcenje kursa

$(document).ready(function(){
    if(window.location.href.includes("user-profile.html")){ //proverava na kojoj smo stranici
        let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

        let request = new XMLHttpRequest(); //pravljenje requesta

        userList = []   //niz korisnika

        users = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

        request.onreadystatechange = function (){  
            if (this.readyState == 4){
                if (this.status == 200){
                    
                    users = JSON.parse(request.responseText);   //users objekat prihvata odgovor sa servera u .json formatu
                    
                    for (let i in users){   //iterira se kroz users objekat
                        userList.push(users[i]) //i kreira se niz korisnika (za laksi rad)
                        userIDList.push(i); //kao i niz kljuceva
                    }
                    
                    user = window.location.href.split('/')      //nalazi username iz URL-a
                    user = user[user.length - 1].split('?')
                    user = user[1].split('=')
                    user = user[1]

                    for (x in userList){
                        if(user == userList[x].korisnickoIme)   //trazi korisnika u nizu i pamti ga u x
                            break;
                    }

                    let table = document.getElementById("table");   //dohvata tabelu
                    table.rows[0].cells[1].innerHTML = userIDList[x];   //i upisuje vrednosti u nju
                    table.rows[1].cells[1].innerHTML = `@${userList[x].korisnickoIme}`;
                    table.rows[2].cells[1].innerHTML = `${'•'.repeat(userList[x].lozinka.length)} <button type="button" class="btn btn-outline ml-3" id="pswdToggle" onclick="toggle()">Show</button>`;
                    table.rows[3].cells[1].innerHTML = userList[x].datumRodjenja.split("-").join("/");
                    table.rows[4].cells[1].innerHTML = userList[x].adresa;
                    table.rows[5].cells[1].innerHTML = userList[x].telefon;
                    document.getElementById('userName').innerHTML = userList[x].ime + ' ' + userList[x].prezime;

                    document.getElementById("edit-user").href = `./edit-user.html?user=${userList[x].korisnickoIme}`
                }
            }
        }

        request.open('GET', firebase + '/korisnici.json');  //slanje GET zahteva
        request.send();
    }
    else{
        let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

        let request = new XMLHttpRequest(); //pravljenje requesta

        courseList = []   //niz korisnika

        courses = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

        request.onreadystatechange = function (){  
            if (this.readyState == 4){
                if (this.status == 200){
                    
                    courses = JSON.parse(request.responseText);   //users objekat prihvata odgovor sa servera u .json formatu
                    
                    for (let i in courses){   //iterira se kroz users objekat
                        courseList.push(courses[i]); //i kreira se niz korisnika (za laksi rad)
                    }
                    
                    course = window.location.href.split('/');       //nalazi courseID iz URL-a
                    course = course[course.length - 1].split('?');
                    course = course[1].split('=');
                    course = course[1];

                    for (y in courseList){
                        if(course == courseList[y].id)  //trazi kurs u nizu i pamti ga u y
                            break;
                    }

                    let table = document.getElementById("table");   //dohvata tabelu
                    table.rows[0].cells[1].innerHTML = courseList[y].id;    //i popunjava je podacima
                    table.rows[1].cells[1].innerHTML = courseList[y].autor;
                    table.rows[2].cells[1].innerHTML = courseList[y].datumIzmene.split("-").join("/");
                    table.rows[3].cells[1].innerHTML = courseList[y].opis;
                    table.rows[4].cells[1].innerHTML = `$${Math.round(courseList[y].cena / 100)} (free with ezPro)`;
                    table.rows[5].cells[1].innerHTML = courseList[y].brojLekcija;
                    table.rows[6].cells[1].innerHTML = courseList[y].kategorija.split("_").join(" ");
                    table.rows[7].cells[1].innerHTML = courseList[y].jezik;
                    table.rows[8].cells[1].innerHTML = `${courseList[y].prosecnaOcena} / 5`;
                    table.rows[9].cells[1].innerHTML = courseList[y].brojKorisnika;
                    table.rows[10].cells[1].innerHTML = courseList[y].sertifikovan[0].toUpperCase() + courseList[y].sertifikovan.slice(1).toLowerCase();
                    document.getElementById('courseName').innerHTML = courseList[y].naziv;
                    document.getElementById('courseImg').src = courseList[y].slika;

                    document.getElementById("edit-course").href = `./edit-course.html?id=${courseList[y].id}`
                }
            }
        }

        request.open('GET', firebase + '/kursevi.json');  //slanje GET zahteva
        request.send();
    }

    $("#delete-user").click(function(){             //otvaranje i zatvaranje modala
        $("#delete-user-modal").modal("show");
    });

    $("#yes-delete-user").click(function(){
        $("#delete-user-modal").modal("hide");
        $("#deleted-user-modal").modal("show");
    });

    $("#deact-user").click(function(){
        $("#deact-modal").modal("show");
    });

    $("#yes-deact-user").click(function(){
        $("#deact-modal").modal("hide");
        $("#deacted-modal").modal("show");
    });

    $("#delete-course").click(function(){
        $("#delete-course-modal").modal("show");
    });

    $("#yes-delete-course").click(function(){
        $("#delete-course-modal").modal("hide");
        $("#deleted-course-modal").modal("show");
    });

    $("#add-to-cart").click(function(){
        $("#add-to-cart-modal").modal("show");
    });
});

function toggle(){  //funkcija koja pokazuje/sakriva lozinku
    let firstCH = document.getElementById('pswd').innerHTML[0];
    if(firstCH == '•'){ //ukoliko je sakrivena, pokazace je
        document.getElementById('pswd').innerHTML = `${userList[x].lozinka} <button type="button" class="btn btn-outline ml-3" id="pswdToggle" onclick="toggle()">Show</button>`;
        document.getElementById('pswdToggle').innerHTML = 'Hide';
    }
    else{   //odnosno sakrice je ukoliko je pokazana
        document.getElementById('pswd').innerHTML = `${'•'.repeat(userList[x].lozinka.length)} <button type="button" class="btn btn-outline ml-3" id="pswdToggle" onclick="toggle()">Show</button>`;
        document.getElementById('pswdToggle').innerHTML = 'Show';
    }
}