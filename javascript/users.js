userList = [] //niz korisnika

$(document).ready(function(){
    let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

    let request = new XMLHttpRequest(); //pravljenje requesta

    let userList = []   //niz korisnika

    users = {}  //JS objekat koji ce prihvatiti .json file sa firebase-a

    request.onreadystatechange = function (){  
        if (this.readyState == 4){
            if (this.status == 200){
                document.getElementById('all-users').innerHTML = "";    //div u kome se ispisuju korisnici se cisti (iako je prazan, ali za svaki slucaj)
                
                users = JSON.parse(request.responseText);   //users objekat prihvata odgovor sa servera u .json formatu
                
                for (let i in users){   //iterira se kroz users objekat
                    userList.push(users[i]) //i kreira se niz korisnika (za laksi rad)
                }
            
                for (let i in userList){    //iterira se kroz niz korisnika
                    document.getElementById('all-users').innerHTML +=   //i dopunjuje se karticom korisnika
                    `
                        <div class="col-lg-3 col-md-4 mb-5">
                            <div class="card h-100">
                                <img class="card-img-top" src="../images/user.png">
                                <div class="card-body d-flex flex-column">
                                    <h4 class="card-title">${userList[i].ime + " " + userList[i].prezime}</h4>
                                    <p>
                                        @${userList[i].korisnickoIme}<br>
                                        Email: ${userList[i].email}<br>
                                        Birthday: ${userList[i].datumRodjenja.split("-").join("/")}<br>
                                    </p>
                                    <div class="btn-toolbar mt-auto" role="toolbar">
                                        <a href="./user-profile.html?user=${userList[i].korisnickoIme}" class="btn btn-dark mr-2">Show</a>
                                        <a href="./edit-user.html?user=${userList[i].korisnickoIme}" class="btn btn-outline-dark">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }   //` se koristi za formatiranje stringa, unutar se pise HTML kod za karticu

            }
            else {
                document.getElementById('all-users').innerHTML +=   //u slucaju greske
                `
                    <div class="col-lg-3 col-md-4 mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="../images/user.png">
                            <div class="card-body d-flex flex-column">
                                <h4 class="card-title">Error</h4>
                                <p>
                                    @error<br>
                                    Email: error<br>
                                    Birthday: error<br>
                                </p>
                                <div class="btn-toolbar mt-auto" role="toolbar">
                                    <a href="#" class="btn btn-dark mr-2">Show</a>
                                    <a href="#" class="btn btn-outline-dark">Edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }

    request.open('GET', firebase + '/korisnici.json');  //slanje GET zahteva
    request.send();
});