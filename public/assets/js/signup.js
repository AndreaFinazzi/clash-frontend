$(window).on('load', function () {
    // VALIDATION
    checkAuth()
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})

$('document').ready(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    $('.loader').delay(500).fadeOut('slow');

    $("#signForm").on("submit", function (event) {
        event.preventDefault();
        var object = {};
        let formData = new FormData($(this)[0]);

        api.auth.checkEmail(formData.get('email'))
            .then(isAvailable => {
                if (!isAvailable) {
                    $('#invalidMailAlarm').show();
                    return;
                }
                $('#invalidMailAlarm').hide();
                $('.loader').delay(50).fadeIn('slow');
                return api.auth.signup(formData)
                    .then(data => {
                        if (data.status == 500) return Promise.reject(data);
                        else window.location = "/iscrizione.html?success=true&membership=" + data.id
                    })
                    .catch(err => window.location = "/sorryforthat.html");
            })
    });
})

function checkAuth() {
    if (window.user.logged === false) {
        api.auth.check()
            .then((success) => {
                if (success) {
                    window.location = '/iscrizione.html'
                }
            })
            .catch(res => {
                window.user.logged = false;
            })
    }
}

var MailStudente1 = "";
var MailStudente2 = "";
var MailGenitore1 = "";
var MailGenitore2 = "";

function AggiornaMailStudente1(val) {
    MailStudente1 = val;
    VerificaMailStudente();
}

function AggiornaMailStudente2(val) {
    MailStudente2 = val;
    VerificaMailStudente();
}

function VerificaMailStudente() {
    if (MailStudente1 != "" && MailStudente2 != "") {
        if (MailStudente1 != MailStudente2) {
            document.getElementById("MailStudenteAlarm").style.display = "block";
        }
        else {
            document.getElementById("MailStudenteAlarm").style.display = "none";
        }
    }

}


var Password1 = "";
var Password2 = "";


function AggiornaPassword1(val) {
    Password1 = val;
    VerificaPassword();
}

function AggiornaPassword2(val) {
    Password2 = val;
    VerificaPassword();
}

function VerificaPassword() {
    if (Password1 != "" && Password2 != "") {
        if (Password1 != Password2) {
            document.getElementById("PasswordAlarm").style.display = "block";
        }
        else {
            document.getElementById("PasswordAlarm").style.display = "none";
        }
    }
}
