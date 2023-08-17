userList = [];
userIDList = [];
courseList = [];
courseCategories = [];
courseLanguages = [];
x = null;

$(document).ready(function(){
    if(window.location.href.includes("edit-user.html")){ 
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
                        userIDList.push(i);
                    }
                    
                    user = window.location.href.split('/')
                    user = user[user.length - 1].split('?')
                    user = user[1].split('=')
                    user = user[1]

                    for (x in userList){
                        if(user == userList[x].korisnickoIme)
                            break;
                    }

                    document.getElementById('user-id').value = userIDList[x];
                    document.getElementById('user-name').value = userList[x].ime + ' ' + userList[x].prezime;
                    document.getElementById('user-user').value = userList[x].korisnickoIme;
                    document.getElementById('user-pass').value = userList[x].lozinka;
                    document.getElementById('user-mail').value = userList[x].email;
                    document.getElementById('user-bday').value = userList[x].datumRodjenja;
                    document.getElementById('user-address').value = userList[x].adresa;
                    document.getElementById('user-phone').value = userList[x].telefon;
                }
            }
        }

        request.open('GET', firebase + '/korisnici.json');  //slanje GET zahteva
        request.send();

        $("#submit-btn").click(function(){
            let name = document.getElementById('user-name').value;
            let username = document.getElementById('user-user').value;
            let password = document.getElementById('user-pass').value;
            let mail = document.getElementById('user-mail').value;
            let address = document.getElementById('user-address').value;
            let phone = document.getElementById('user-phone').value;
        
            if((name == "") || (username == "") || (password == "") || (mail == "")){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Please fill in all required fields.");
                return;
            }

            if(username.includes(" ")){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Username cannot contain a space.");
                return;
            }

            if(password.length < 8){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Password must be at least 8 characters long.");
                return;
            }

            validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!(validMail.test(mail))){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Please enter a valid email.");
                return;
            }

            validPhone = /^\d+$/;

            if((!(validPhone.test(phone))) && (phone != "")){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Please enter a valid phone number.");
                return;
            }
            
            $("#alert-modal").modal("show");
            $("#alert-text").html("Successfully sumbited.");
        });

        $("#delete-user").click(function(){
            $("#delete-modal").modal("show");
        });
    
        $("#yes-delete-user").click(function(){
            $("#delete-modal").modal("hide");
            $("#deleted-modal").modal("show");
        });

        $("#deact-user").click(function(){
            $("#deact-modal").modal("show");
        });
    
        $("#yes-deact-user").click(function(){
            $("#deact-modal").modal("hide");
            $("#deacted-modal").modal("show");
        });
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

                    for (let i in courseList){
                        if(!(courseCategories.includes(courseList[i].kategorija))){
                            courseCategories.push(courseList[i].kategorija)
                        }

                        if(!(courseLanguages.includes(courseList[i].jezik))){
                            courseLanguages.push(courseList[i].jezik)
                        }
                    }
                    
                    course = window.location.href.split('/');
                    course = course[course.length - 1].split('?');
                    course = course[1].split('=');
                    course = course[1];

                    for (y in courseList){
                        if(course == courseList[y].id)
                            break;
                    }

                    let select = document.getElementById("course-category");
                    courseCategories.forEach(function(item){
                        let option = document.createElement("option");
                        option.text = item.toString().split("_").join(" ");
                        select.add(option);
                    });

                    select.value = courseList[y].kategorija;

                    select = document.getElementById("course-lang");
                    courseLanguages.forEach(function(item){
                        let option = document.createElement("option");
                        option.text = item.toString();
                        select.add(option);
                    });

                    select.value = courseList[y].jezik;

                    document.getElementById('course-id').value = courseList[y].id;
                    document.getElementById('course-name').value = courseList[y].naziv;
                    document.getElementById('course-author').value = courseList[y].autor;
                    document.getElementById('course-last-mod').value = courseList[y].datumIzmene;
                    document.getElementById('course-desc').value = courseList[y].opis;
                    document.getElementById('course-price').value = Math.round(courseList[y].cena / 100);
                    document.getElementById('course-lessons').value = courseList[y].brojLekcija;
                    document.getElementById('course-category').select
                    document.getElementById('course-lang').value = courseList[y].jezik;
                    document.getElementById('no-of-users').value = courseList[y].brojKorisnika;
                    document.getElementById('avg-rating').value = courseList[y].prosecnaOcena;
                    if(courseList[y].sertifikovan == 'da'){
                        $('#course-cert-0').checked = true;
                        $('#course-cert-1').checked = false;
                    }
                    else{
                        $('#course-cert-0').checked = false;
                        $('#course-cert-1').checked = true;
                    }
                }
            }
        }

        request.open('GET', firebase + '/kursevi.json');  //slanje GET zahteva
        request.send();

        $("#submit-btn").click(function(){
            let name = document.getElementById('course-name').value;
            let author = document.getElementById('course-author').value;
            let price = document.getElementById('course-price').value;
            let lessons = document.getElementById('course-lessons').value;
        
            if((name == "") || (author == "")){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Please fill all required fields.");
                return;
            }

            validNumber = /^\d+$/;

            if((!(validNumber.test(price))) && (price != "")){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Please enter a valid price.");
                return;
            }

            if((!(validNumber.test(lessons))) && (lessons != "")){
                $("#alert-modal").modal("show");
                $("#alert-text").html("Please enter a valid number of lessons.");
                return;
            }
            
            $("#alert-modal").modal("show");
            $("#alert-text").html("Successfully sumbited.");
        });

        $("#delete-course").click(function(){
            $("#delete-modal").modal("show");
        });
    
        $("#yes-delete-course").click(function(){
            $("#delete-modal").modal("hide");
            $("#deleted-modal").modal("show");
        });
    }
});