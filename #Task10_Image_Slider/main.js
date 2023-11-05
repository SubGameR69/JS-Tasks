// Get slider items | Array.from[ES6 Feature]
var sliderImages = Array.from(document.querySelectorAll(".slider-container img"));

// Get Number of Slides
var slidesCount = sliderImages.length;

// set current Slide
var currentSlide = 1

// Slide Number
var slideNumber = document.getElementById("slide-number");

// prev and next buttons
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");

function nextSlide () {
    if (nextBtn.classList.contains("disabled")) {
        // Do nothing
        return false
    }else{
        currentSlide++;
        checker();
    }
}

function prevSlide () {
    if (prevBtn.classList.contains("disabled")) {
        // Do nothing
        return false
    }else{
        currentSlide--;
        checker();
    }
}

// handle click prev and next
prevBtn.onclick = prevSlide;
nextBtn.onclick = nextSlide;

// create main ul elements
var paginationEl = document.createElement("ul");
paginationEl.setAttribute("id", "pagination-ul");

// Create list items based on array length
for (let i = 1; i <= slidesCount; i++) {
    // create li and set data-index and append textNode
    var paginationItem = document.createElement("li");
    paginationItem.setAttribute("data-index", i);
    paginationItem.appendChild(document.createTextNode(i));

    // Append li items to the ul Element
    paginationEl.appendChild(paginationItem);
}

// add Created ul List to the page
document.getElementById("indicators").appendChild(paginationEl);

// Get the New Created Ul
var newPaginationEl = document.getElementById("pagination-ul");

// Get pagination items | Array.from()
var paginationBullets = Array.from(document.querySelectorAll("#pagination-ul li"));

// loop through all the pagination bullets
for (i = 0; i < paginationBullets.length; i++) {
    paginationBullets[i].onclick = function () {
        currentSlide = parseInt(this.getAttribute("data-index"));
        checker();
    }
}

// trigger the checker function
checker();

// Create the checker function
function checker () {
    // set the slide number
    slideNumber.textContent = 'Slide # ' + currentSlide  + ' of ' + slidesCount;

    // remove all active classes
    removeActive();

    // set active class on current slide
    sliderImages[currentSlide - 1].classList.add("active");

    // set active class on current pagination item
    newPaginationEl.children[currentSlide - 1].classList.add("active");

    // check if the current slide is the first
    if (currentSlide === 1) {
        // Add disabled class to prev Btn
        prevBtn.classList.add("disabled");
    }else {
        // remove disabled class
        prevBtn.classList.remove("disabled");
    }

    // check if the current slide is the last
    if (currentSlide === slidesCount) {
        // Add disabled class to next Btn
        nextBtn.classList.add("disabled");
    }else{
        // remove disbled class
        nextBtn.classList.remove("disabled");
    }
}

function removeActive() {
    // Loop through Images
    sliderImages.forEach(function (img) {
         img.classList.remove("active");
    });

    // Loop through all the bullets
    paginationBullets.forEach(function (bullet) {
        bullet.classList.remove("active");
    })
}