
/* scroll smothly when hover nav bars */
 var navMenuTags=document.querySelectorAll('.nav-menu a');
    
 for (var i = 0; i < navMenuTags.length;i++) {
    navMenuTags[i].addEventListener('click', function(event){
        event.preventDefault();
        var targetSectionId = this.textContent.trim().toLowerCase();
        var targetSection =document.getElementById(targetSectionId);
        // console.log(targetSection);
        var interval =setInterval(function(){
        var targetSectionCordinates = targetSection.getBoundingClientRect();
        if(targetSectionCordinates.top <= 0){
            clearInterval(interval);
            return;
        }
        window.scrollBy(0, 50);
    }, 20)
    });
 }

// fill skill bars when reach the skill section
 var progressBars = document.querySelectorAll(".skill-progress > div");
function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}



function fillBar(bar) {

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);

}



// This function uses a for loop for individual progress bars.
function checkScroll() {

    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }

    }
}



window.addEventListener("scroll", checkScroll);



// to add form data to google sheet
const scriptUrl = 'https://script.google.com/macros/s/AKfycby_x2zewrpZJJVVYAoI1v3DT0YrzVx1860I7e7flAAcESz0Xx_B7rk1E2tEx8UV7sU/exec';
const form=document.forms['subtim-to-google-sheet'];

form.addEventListener('submit',e=>{
    e.preventDefault();
    fetch(scriptUrl, {method: 'POST',body: new FormData(form)})
    .then(response =>{
        window.alert("send successfully");
         form.reset();
    })
    .catch(error =>console.error('Error!',error.message));
       
})