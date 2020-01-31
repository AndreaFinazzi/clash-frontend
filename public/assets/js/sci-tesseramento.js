
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

$('document').ready(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    checkPaid();

    $("#purchaseForm").on("submit", function (event) {
        event.preventDefault();
        $('.loader').delay(50).fadeIn('slow');
        var object = {};
        let formData = new FormData($(this)[0]);

        api.purchase_ski(formData)
            .then(response => {
                if (response.ok) return response.json();
                if (response.status >= 400) return Promise.reject(response);
            })
            .then(data => {
                if (data.status == 500) return Promise.reject(data);
                else window.location = "/pagamento.html?success=true&membership=" + data.id
            })
            .catch(err => window.location = "/sorryforthat.html");
    });
});

function checkPaid() {
    api.getPaidItems().then(response => {
        if (response.ok) return response.json();
        if (response.status >= 400) return Promise.reject(response);
    })
        .then(data => {
            if (data.status == 500) return Promise.reject(data);
            else if (data.paid == true) window.location = "/grazie.html?success=true&membership=" + data.id
        })
        .catch(err => window.location = "/sorryforthat.html");
}

var ruolo = "";

function SelezionePedone(val) {

    if (val == 1) {
        document.getElementById("PacchettoHidden").value = "27022020sci-trekky";
        document.getElementById("sel1-pedone").style.background = "#1F375F";
        document.getElementById("sel1-pedone-icons").style.display = "none";
        document.getElementById("sel1-pedone-icons2").style.display = "block";
        document.getElementById("sel3-pedone-icons2").style.display = "none";
        document.getElementById("sel3-pedone-icons").style.display = "block";
        document.getElementById("sel2-pedone-icons2").style.display = "none";
        document.getElementById("sel2-pedone-icons").style.display = "block";
        document.getElementById("sel2-pedone-icons4").style.display = "none";
        document.getElementById("sel2-pedone-icons3").style.display = "block";
        document.getElementById("sel1-title-pedone").style.color = "#ffffff";
        document.getElementById("sel1-content-pedone").style.color = "#ffffff";
        document.getElementById("sel2-pedone").style.background = "#ffffff";
        document.getElementById("sel2-title-pedone").style.color = "#1F375F";
        document.getElementById("sel2-content-pedone").style.color = "#2b353a";
        document.getElementById("sel3-pedone").style.background = "#ffffff";
        document.getElementById("sel3-title-pedone").style.color = "#1F375F";
        document.getElementById("sel3-content-pedone").style.color = "#2b353a";
    }
    else if (val == 2) {
        document.getElementById("PacchettoHidden").value = "27022020sci-comfort";
        document.getElementById("sel2-pedone").style.background = "#1F375F";
        document.getElementById("sel2-title-pedone").style.color = "#ffffff";
        document.getElementById("sel2-pedone-icons").style.display = "none";
        document.getElementById("sel2-pedone-icons2").style.display = "block";
        document.getElementById("sel2-pedone-icons3").style.display = "none";
        document.getElementById("sel2-pedone-icons4").style.display = "block";
        document.getElementById("sel1-pedone-icons2").style.display = "none";
        document.getElementById("sel1-pedone-icons").style.display = "block";
        document.getElementById("sel3-pedone-icons2").style.display = "none";
        document.getElementById("sel3-pedone-icons").style.display = "block";
        document.getElementById("sel2-content-pedone").style.color = "#ffffff";
        document.getElementById("sel1-pedone").style.background = "#ffffff";
        document.getElementById("sel1-title-pedone").style.color = "#1F375F";
        document.getElementById("sel1-content-pedone").style.color = "#2b353a";
        document.getElementById("sel3-pedone").style.background = "#ffffff";
        document.getElementById("sel3-title-pedone").style.color = "#1F375F";
        document.getElementById("sel3-content-pedone").style.color = "#2b353a";
    }
    else if (val == 3) {
        document.getElementById("PacchettoHidden").value = "27022020sci-fun";
        document.getElementById("sel3-pedone").style.background = "#1F375F";
        document.getElementById("sel3-title-pedone").style.color = "#ffffff";
        document.getElementById("sel3-pedone-icons").style.display = "none";
        document.getElementById("sel3-pedone-icons2").style.display = "block";
        document.getElementById("sel1-pedone-icons2").style.display = "none";
        document.getElementById("sel1-pedone-icons").style.display = "block";
        document.getElementById("sel2-pedone-icons2").style.display = "none";
        document.getElementById("sel2-pedone-icons").style.display = "block";
        document.getElementById("sel2-pedone-icons4").style.display = "none";
        document.getElementById("sel2-pedone-icons3").style.display = "block";
        document.getElementById("sel3-content-pedone").style.color = "#ffffff";
        document.getElementById("sel1-pedone").style.background = "#ffffff";
        document.getElementById("sel1-title-pedone").style.color = "#1F375F";
        document.getElementById("sel1-content-pedone").style.color = "#2b353a";
        document.getElementById("sel2-pedone").style.background = "#ffffff";
        document.getElementById("sel2-title-pedone").style.color = "#1F375F";
        document.getElementById("sel2-content-pedone").style.color = "#2b353a";
    }

}

function SelezioneSci(val) {

    if (val == 1) {
        document.getElementById("PacchettoHidden").value = "27022020sci-slalom";
        document.getElementById("sel1-sci").style.background = "#1F375F";
        document.getElementById("sel1-title-sci").style.color = "#ffffff";
        document.getElementById("sel1-content-sci").style.color = "#ffffff";
        document.getElementById("sel2-sci").style.background = "#ffffff";
        document.getElementById("sel2-title-sci").style.color = "#1F375F";
        document.getElementById("sel2-content-sci").style.color = "#2b353a";
        document.getElementById("sel3-sci").style.background = "#ffffff";
        document.getElementById("sel3-title-sci").style.color = "#1F375F";
        document.getElementById("sel3-content-sci").style.color = "#2b353a";
    }
    else if (val == 2) {
        document.getElementById("PacchettoHidden").value = "27022020sci-competition";
        document.getElementById("sel2-sci").style.background = "#1F375F";
        document.getElementById("sel2-title-sci").style.color = "#ffffff";
        document.getElementById("sel2-content-sci").style.color = "#ffffff";
        document.getElementById("sel1-sci").style.background = "#ffffff";
        document.getElementById("sel1-title-sci").style.color = "#1F375F";
        document.getElementById("sel1-content-sci").style.color = "#2b353a";
        document.getElementById("sel3-sci").style.background = "#ffffff";
        document.getElementById("sel3-title-sci").style.color = "#1F375F";
        document.getElementById("sel3-content-sci").style.color = "#2b353a";
    }
    else if (val == 3) {
        document.getElementById("PacchettoHidden").value = "27022020sci-experience";
        document.getElementById("sel3-sci").style.background = "#1F375F";
        document.getElementById("sel3-title-sci").style.color = "#ffffff";
        document.getElementById("sel3-content-sci").style.color = "#ffffff";
        document.getElementById("sel1-sci").style.background = "#ffffff";
        document.getElementById("sel1-title-sci").style.color = "#1F375F";
        document.getElementById("sel1-content-sci").style.color = "#2b353a";
        document.getElementById("sel2-sci").style.background = "#ffffff";
        document.getElementById("sel2-title-sci").style.color = "#1F375F";
        document.getElementById("sel2-content-sci").style.color = "#2b353a";
    }

}


function MostraPrezzi(val) {
    if (val == "pedone") {
        document.getElementById("gara").required = false;
        document.getElementById("PacchettiPasseggero").style.display = "block";
        document.getElementById("PacchettiSci").style.display = "none";
        ruolo = "pedone";
    } else {
        ruolo = "sci";
        document.getElementById("gara").required = true;
        document.getElementById("PacchettiPasseggero").style.display = "none";
        document.getElementById("PacchettiSci").style.display = "block";
    }
    document.getElementById("MostraPrezzi").style.display = "block";
}

function cascinet(val) {
    if (val == 1) {
        var due = 2;
        var tre = 5;
        var quattro = 25;
    }
    else if (val == 2) {
        var due = 1;
        var tre = 5;
        var quattro = 25;
    }
    else if (val == 5) {
        var due = 2;
        var tre = 1;
        var quattro = 25;
    }
    else if (val == 25) {
        var due = 2;
        var tre = 1;
        var quattro = 5;
    }
    var valore = document.getElementById("cascinet-input").value;
    if (val == valore) {
        document.getElementById("cascinet-input").value = "";
        cascinetOff(val);
        return;
    }
    cascinetOn(val);
    document.getElementById("cascinet-input").value = val;
    cascinetOff(due);
    cascinetOff(tre);
    cascinetOff(quattro);
}

function cascinetOn(val) {

    document.getElementById("cascinet" + val).style.border = "none";
    document.getElementById("cascinet" + val).style.background = "#028F01";
    document.getElementById("cascinet" + val).style.color = "#ffffff";
}

function cascinetOff(val) {
    document.getElementById("cascinet" + val).style.border = "2px solid #028F01";
    document.getElementById("cascinet" + val).style.background = "#ffffff";
    document.getElementById("cascinet" + val).style.color = "#028F01";
}

/*
function OscuraPrezzi(){
    document.getElementById("sel1").style.background = "#1F375F";
    document.getElementById("sel1-title").style.color = "#ffffff";
    document.getElementById("sel1-content").style.color = "#ffffff";
    document.getElementById("sel2").style.background = "#828282";
    document.getElementById("sel2-title").style.color = "#ffffff";
    document.getElementById("sel2-content").style.color = "#ffffff";
    document.getElementById("sel3").style.background = "#828282";
    document.getElementById("sel3-title").style.color = "#ffffff";
    document.getElementById("sel3-content").style.color = "#ffffff";
}*/