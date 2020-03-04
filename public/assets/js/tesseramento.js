
// #################### LOAD API.js FIRST!

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
var today;

$(window).on('load', function () {
    today = new Date();
    today.setFullYear(this.today.getFullYear() - 18);
    // VALIDATION
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                if ($('#email-genitore').val() == $('#conferma-email-genitore').val()) {

                    $('.loader').delay(50).fadeIn('slow');
                    var object = {};
                    let formData = new FormData($(this)[0]);

                    api.opes_mp(formData)
                        .then(response => {
                            if (response.ok) return response.json();
                            if (response.status >= 400) return Promise.reject(response);
                        })
                        .then(data => {
                            if (data.status == 500) return Promise.reject(data);
                            else window.location = "/flow.html"
                        })
                        .catch(err => window.location = "/sorryforthat.html");
                }
                form.classList.add('was-validated');
            }
        }, false);
    });

    if (window.user.logged) {
        this.checkMembership();
    } else {
        window.addEventListener('user-logged', event => {
            this.checkMembership();
        })
    }

})

$('document').ready(function () {
    $("#selfie").on("change", function (e) {
        var count = 1;
        var files = e.currentTarget.files; // puts all files into an array
        // call them as such; files[0].size will get you the file size of the 0th file
        for (var x in files) {
            var filesize = ((files[x].size / 1024) / 1024).toFixed(2); // MB
            if (files[x].name != "item" && typeof files[x].name != "undefined" && filesize <= 10) {
                if (count > 1) {
                    approvedHTML += ", " + files[x].name;
                }
                else {
                    approvedHTML += files[x].name;
                }
                count++;
            }
        }
        $("#approvedFiles").val(approvedHTML);
    });
});


function checkMembership() { 
    api.getMembership('opes').then(response => {
        if (response.ok) return response.json();
        return Promise.resolve(false)
    })
        .then(data => {
            if (data.valid == true) window.location = "/flow.html"
            return Promise.resolve(false)
        })
        .catch(err => window.location = "/sorryforthat.html");
}


function CheckValue(val) {
    var element = document.getElementById('altro_scuola');
    if (val == 'altro')
        element.style.display = 'block';
    else
        element.style.display = 'none';
}


var giorno = 0;
var mese = 0;
var anno = 0;
var date;

var DataNascita = new Date();
var datiGenitoreContainer = $("#DatiGenitore");
var genitoreFields = datiGenitoreContainer.children()[0].cloneNode(true);
datiGenitoreContainer.children()[0].remove()

function CheckDate() {
    //alert(DataNascita+" - "+today);

    if (anno > today.getFullYear() ||
        (anno == today.getFullYear() && mese > today.getMonth()) ||
        (anno == today.getFullYear() && mese == today.getMonth() && giorno > today.getDate())) {
        if (datiGenitoreContainer.children().length < 1) datiGenitoreContainer.append(genitoreFields);
    }
    else {
        if (datiGenitoreContainer.children().length > 0) datiGenitoreContainer.children()[0].remove()
    }
}

function AggiornaGiorno(val) {
    if (val < 1 || val > 31) {
        document.getElementById("DataAlarm").style.display = "block";
    } else {
        document.getElementById("DataAlarm").style.display = "none";
    }
    giorno = val;
    CheckDate();

}
function AggiornaMese(val) {
    if (val < 1 || val > 12) {
        document.getElementById("DataAlarm").style.display = "block";
    } else {
        document.getElementById("DataAlarm").style.display = "none";
    }
    mese = val - 1;
    CheckDate();
}
function AggiornaAnno(val) {
    anno = val;
    CheckDate();
}

function AggiornaGiornoGenitore(val) {
    if (val < 1 || val > 31) {
        document.getElementById("DataAlarmGenitore").style.display = "block";
    } else {
        document.getElementById("DataAlarmGenitore").style.display = "none";
    }
}
function AggiornaMeseGenitore(val) {
    if (val < 1 || val > 12) {
        document.getElementById("DataAlarmGenitore").style.display = "block";
    } else {
        document.getElementById("DataAlarmGenitore").style.display = "none";
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


function AggiornaMailGenitore1(val) {
    MailGenitore1 = val;
    VerificaMailGenitore();
}

function AggiornaMailGenitore2(val) {
    MailGenitore2 = val;
    VerificaMailGenitore();
}

function VerificaMailGenitore() {
    if (MailGenitore1 != "" && MailGenitore2 != "") {
        if (MailGenitore1 != MailGenitore2) {
            document.getElementById("MailGenitoreAlarm").style.display = "block";
        }
        else {
            document.getElementById("MailGenitoreAlarm").style.display = "none";
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

function LunghezzaCF(String) {
    if (String.length != 16) {
        document.getElementById("CFStudenteAlarm").style.display = "block";
    }
    else {
        document.getElementById("CFStudenteAlarm").style.display = "none";
    }
}

function LunghezzaCFGenitore(String) {
    if (String.length != 16) {
        document.getElementById("CFAlarmGenitore").style.display = "block";
    }
    else {
        document.getElementById("CFAlarmGenitore").style.display = "none";
    }
}

function LunghezzaNumero(String) {

    if (String.length < 9 || (String[0] != '3' && String[0] != "+")) {
        document.getElementById("NumeroAlarm").style.display = "block";
    }
    else {
        document.getElementById("NumeroAlarm").style.display = "none";
    }
}

function LunghezzaNumeroGenitore(String) {
    if (String.length < 9 || (String[0] != '3' && String[0] != "+")) {
        document.getElementById("NumeroGenitoreAlarm").style.display = "block";
    }
    else {
        document.getElementById("NumeroGenitoreAlarm").style.display = "none";
    }
}

function LunghezzaProvincia(String) {

    if (String.length != 2) {
        document.getElementById("ProvinciaAlarm").style.display = "block";
    }
    else {
        document.getElementById("ProvinciaAlarm").style.display = "none";
    }
}

function LunghezzaProvinciaGenitore(String) {

    if (String.length != 2) {
        document.getElementById("ProvinciaGenitoreAlarm").style.display = "block";
    }
    else {
        document.getElementById("ProvinciaGenitoreAlarm").style.display = "none";
    }
}



function AggiornaScuole(val) {
    if (val == "no_school") {
        document.getElementById("scuole-alt").type = "text";
    }
    else {
        document.getElementById("scuole-alt").type = "hidden";
        document.getElementById("scuole-alt").value = val;
    }

}