function filter(id){
    document.getElementById("all").classList.remove("btn-dark");    //menja stil dugmica za filtere
    document.getElementById("all").classList.remove("btn-default");

    for (i in filters){
        document.getElementById(filters[i]).classList.remove("btn-dark");
        document.getElementById(filters[i]).classList.remove("btn-default");
    }

    document.getElementById(id).classList.add("btn-dark");  //i oznacava izabrano

    if(id == "all"){
        $(".filter").show("slow");
    }
    else{
        $(".filter").not('.' + id).hide('3000');
        $(".filter").filter('.' + id).show("slow");
    }
}

filters = []    //niz filtera
courseList = [] //niz kurseva

$(document).ready(function(){
    let firebase = 'https://ezcourses-4028c-default-rtdb.firebaseio.com'    //firebase url

    let request = new XMLHttpRequest();     //pravljenje request-a

    courseList = []

    courses = {}

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById('all-courses').innerHTML = "";  //uklanja sve sto se nalazi na stranici
                
                courses = JSON.parse(request.responseText);
                
                for (let i in courses){
                    courseList.push(courses[i])
                }

                filters = []

                for (let i in courseList){                                  //stavlja filtere/kategorije u niz
                    if(!(filters.includes(courseList[i].kategorija))){
                        filters.push(courseList[i].kategorija)
                    }
                }

                for (let i in filters){ //prikazuje filtere
                    document.getElementById('filter-buttons').innerHTML +=
                    `
                        <button class="btn btn-default filter-button mb-2" id="${filters[i]}" onclick="filter(id)">${filters[i].split('_').join(" ")}</button>
                    `
                }
            
                for (let i in courseList){  //izlistava kartice kurseva
                    document.getElementById('all-courses').innerHTML +=
                    `
                        <div class="col-lg-3 col-md-4 mb-5 filter ${courseList[i].kategorija}">
                            <div class="card h-100">
                                <img class="card-img-top" src="${courseList[i].slika}">
                                <div class="card-body d-flex flex-column">
                                    <h4 class="card-title">${courseList[i].naziv}</h4>
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
                    `
                }

            }
            else {
                alert('Error occurred. Cars could not be loaded.')
            }
        }
    }

    request.open('GET', firebase + '/kursevi.json');
    request.send();
});