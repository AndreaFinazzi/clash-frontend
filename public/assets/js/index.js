
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

$('document').ready(function () {
    $("#flipster-scuole").flipster({
        style: 'flat',
        spacing: -0.25,
        autoplay: 2000,
        loop: true,
        pauseOnHover: true,
        click: false
    });

    $("#flipster-sponsor").flipster({
        style: 'flat',
        spacing: 0,
        interval: 10,
        autoplay: 2000,
        loop: true,
        pauseOnHover: true,
        click: false
    });

/* 
==============================================
STICKY HEADER
=============================================== 
*/

    $(window).on('scroll', stickyHeader);

    stickyHeader();
})

stickyHeader = function () {
    if ($(window).scrollTop() < 100) {
        $('.header').removeClass('sticky_header');
        $('.navbar-toggler').prop('disabled', true);
    } else {
        $('.header').addClass('sticky_header');
        $('.navbar-toggler').prop('disabled', false);
    }
}
