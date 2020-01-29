assets_root_staff = '/assets/img/staff/'

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

$('document').ready(function () {
    // $("#flat").flipster({
    //     style: 'flat',
    //     spacing: -0.25,
    //     autoplay: 2000,
    //     loop: true,
    //     pauseOnHover: true,
    //     click: true
    // });


    $('[data-toggle="contatti-opzione"]').click(function (e) {
        data_role = $(this).data('role');
        if (data_role == 'aziende') {
            // TODO img e contenuto temporanei
            loadContattiSend('aziende', 'BOBO.png', 'Davide Airoldi', 'Responsabile area sport', 'In arte "Airo", é coresponsabile dell\'innalzamento delle acque oceaniche, non scendiamo nel dettaglio per ripetto dei minori all\'ascolto, ma ci siamo capiti.', 'partners')
        } else if (data_role == 'scuole') {
            // TODO img e contenuto temporanei
            loadContattiSend('scuole', 'BOBO.png', 'Davide Airoldi', 'Responsabile area sport', 'In arte "Airo", é coresponsabile dell\'innalzamento delle acque oceaniche, non scendiamo nel dettaglio per ripetto dei minori all\'ascolto, ma ci siamo capiti.', 'scuole')
        } else if (data_role == 'studenti') {
            // TODO img e contenuto temporanei
            // Redirect to social section
            return;
        } else {
            return;
        }

        showContattiSend();
    })

    $('[data-toggle="contatti-indietro"]').click(function (e) {
        hideContattiSend();
    })

    /* --------------------------------------------------------
        COUNTER JS
    ----------------------------------------------------------- */

    $('.counter').counterUp({
        delay: 5,
        time: 2000
    });

    /* 
==============================================
    STICKY HEADER
=============================================== 
*/

    $(window).on('scroll', stickyHeader);

    
    stickyHeader();
})

function stickyHeader() {
    if ($(window).scrollTop() < 100) {
        $('.header').removeClass('sticky_header');
        $('.navbar-toggler').prop('disabled', true);
    } else {
        $('.header').addClass('sticky_header');
        $('.navbar-toggler').prop('disabled', false);
    }
}

function loadContattiSend(label, staff_img, title, subtitle, desc, mail) {
    $('#profilo-img').attr('src', assets_root_staff + staff_img);
    $('#profilo-img').removeClass();
    $('#profilo-img').addClass(label);

    $('#profilo-title').html(title);
    $('#profilo-subtitle').html(subtitle);
    $('#profilo-desc').html(desc);
    $('#btn-mailto').attr('href', 'mailto:' + mail + '@clashofschools.it');
    $('#lbl-mailto').html(mail + '@clashofschools.it');
}

function showContattiSend() {
    $('#contact-main').addClass('hidden')
    $('#contact-send').removeClass('hidden')
}

function hideContattiSend() {
    $('#contact-main').removeClass('hidden')
    $('#contact-send').addClass('hidden')
}