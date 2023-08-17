names = []; //niz imena
usernames = []; //niz korisnickih imena
passwords = []; //niz lozinki
x = null;

$(document).ready(function(){
    if(localStorage.getItem("user")){   //proverava se da li u local storage-u postoji definisan korisnik
        document.getElementById("log-user").innerHTML = //ukoliko postoji, u gornjem desnom uglu se prikazuje ime korisnika i sign out dugme
            `
                <span style="color: white;">${localStorage.getItem("user")}<span>
                <button class="btn btn-light ml-2" id="log-out-btn">Sign out</button>
            `
    }
    else{
        document.getElementById("log-user").innerHTML = //u suprotnom se prikazuju sign in i sign up dugmad
            `
                <div class="btn-toolbar" role="toolbar">
                    <a href="#signInModal" data-toggle="modal" data-target="#signInModal" class="btn btn-light mr-2">Sign In</a>
                    <a href="#signUpModal" data-toggle="modal" data-target="#signUpModal" class="btn btn-outline-light">Sign Up</a>
                </div>
            `;
    }

    let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

    let request = new XMLHttpRequest(); //pravljenje requesta

    users = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

    request.onreadystatechange = function (){  
        if (this.readyState == 4){
            if (this.status == 200){
                
                users = JSON.parse(request.responseText);   //users objekat prihvata odgovor sa servera u .json formatu
                
                for (let i in users){   //iterira se kroz users objekat
                    names.push(users[i].ime);
                    usernames.push(users[i].korisnickoIme);
                    passwords.push(users[i].lozinka);
                }
            }
        }
    }

    request.open('GET', firebase + '/korisnici.json');  //slanje GET zahteva
    request.send();

    $("#sing-in-btn").click(function(){ //validacija
        let username = document.getElementById('inputUserSignIn').value;
        let password = document.getElementById('inputPasswordSignIn').value;
    
        if((username == "") || (password == "")){
            $("#alert-p").html("*Please enter both username and password.");
            return;
        }

        if(username.includes(" ")){
            $("#alert-p").html("*Username cannot contain a space.");
            return;
        }

        if(!(usernames.includes(username))){
            $("#alert-p").html("*Username doesn't exist.");
            return;
        }
        else{
            x = usernames.indexOf(username);
        }

        if(password != passwords[x]){
            $("#alert-p").html("*Password isn't correct.");
            return;
        }
        
        localStorage.setItem("user", names[x]); //kada se korisnik prijavi, u local storage se ubacuje njegovo ime
        $("#signInModal").modal("hide");
        $("#main-notif-modal").modal("show");
        $("#main-notif-text").html("Succesfully signed in!");

        $("#main-okay-btn").click(function(){
            window.location.reload();
        });
    });

    $("#log-out-btn").click(function(){
        localStorage.removeItem("user");    //kada se korisnik odjavi, iz local storage-a se izbacuje njegovo ime
        $("#main-notif-modal").modal("show");
        $("#main-notif-text").html("Succesfully singed out!");
        
        $("#main-okay-btn").click(function(){
            window.location.reload();
        });
    });

    $("#sign-up-btn").click(function(){ //validacija
        let name = document.getElementById('inputNameSignUp').value;
        let username = document.getElementById('inputUserSignUp').value;
        let password = document.getElementById('inputPasswordSignUp').value;
        let repassword = document.getElementById('inputPasswordReSignUp').value;
        let mail = document.getElementById('inputEmailSignUp').value;
        let bday = document.getElementById('inputDateSignUp').value;
        let address = document.getElementById('inputAddressSignUp').value;
        let phone = document.getElementById('inputPhoneSignUp').value;
    
        if((name == "") || (username == "") || (password == "") || (mail == "") || (bday == "")){
            $("#alert-p-2").html("*Please fill in all required fields.");
            return;
        }

        if(username.includes(" ")){
            $("#alert-p-2").html("*Username cannot contain a space.");
            return;
        }

        validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!(validMail.test(mail))){
            $("#alert-p-2").html("*Please enter a valid mail.");
            return;
        }

        if(password.length < 8){
            $("#alert-p-2").html("*Password must be at least 8 characters long.");
            return;
        }

        if(password != repassword){
            $("#alert-p-2").html("*Password must match.");
            return;
        }

        validPhone = /^\d+$/;

        if((!(validPhone.test(phone))) && (phone != "")){
            $("#alert-p-2").html("*Please enter a valid phone number.");
            return;
        }
        
        $("#signUpModal").modal("hide");
        $("#main-notif-modal").modal("show");
        $("#main-notif-text").html("Succesfully signed up!");

        $("#main-okay-btn").click(function(){
            window.location.reload();
        });
    });
});