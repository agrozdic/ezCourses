let indicator = 0;

window.onscroll = function(){   //sluzi za pokretanje brojaca sa pocetne stranice
    let viewportWidth = window.innerWidth;
    let scrollPosition = document.documentElement.scrollTop;
    if((viewportWidth > 992) && (scrollPosition > 299) && (indicator == 0)){
        indicator = 1;
        Counter();
    }
    if((viewportWidth > 450) && (scrollPosition > 199) && (indicator == 0)){
        indicator = 1;
        Counter();
    }
    if((viewportWidth > 400) && (scrollPosition > 299) && (indicator == 0)){
        indicator = 1;
        Counter();
    }
    if((viewportWidth > 350) && (scrollPosition > 399) && (indicator == 0)){
        indicator = 1;
        Counter();
    }
    if((viewportWidth > 0) && (scrollPosition > 999) && (indicator == 0)){
        indicator = 1;
        Counter();
    }
}


function Counter(){
    const counters = document.querySelectorAll('.counter');
    const speed = 500;
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target){
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            }
            else{
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
}