var slideIndex = 1;
showSlides(slideIndex);
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("background_slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

function fontResizer(){
    console.log('Hello Mannnishhh');
    document.getElementById("copyright").style.fontSize = "xx-large";
    document.getElementById("article-text").style.fontSize = "xx-large";
}


var slidePostIndex = 1;
showPostSlides(slidePostIndex);

function plusPostSlides(n) {
    showPostSlides(slidePostIndex += n);
}

function currentPostSlide(n) {
    showPostSlides(slidePostIndex = n);
}

function showPostSlides(n) {
    var i;
    var slidesPost = document.getElementsByClassName("postSlides");
    if (n > slidesPost.length) {slidePostIndex = 1}     
    if (n < 1) {slidePostIndex = slidesPost.length}
    for (i = 0; i < slidesPost.length; i++) {
        slidesPost[i].style.display = "none";  
    }
    slidesPost[slidePostIndex-1].style.display = "block";
}