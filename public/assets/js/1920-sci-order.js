
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
    api.getPaidItems('1').then(response => {
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

function SelezionePedone(element) {
    let context = $("#" + element.parentElement.dataset.date)
    if (element.dataset.value == "trekky") {
        context.find("#PacchettoHidden").val(element.parentElement.dataset.date + "sci-trekky");
        context.find("#sel1-pedone").css('background', "#1F375F");
        context.find("#sel1-pedone-icons").toggle(false);
        context.find("#sel1-pedone-icons2").toggle(true);
        context.find("#sel3-pedone-icons2").toggle(false);
        context.find("#sel3-pedone-icons").toggle(true);
        context.find("#sel2-pedone-icons2").toggle(false);
        context.find("#sel2-pedone-icons").toggle(true);
        context.find("#sel2-pedone-icons4").toggle(false);
        context.find("#sel2-pedone-icons3").toggle(true);
        context.find("#sel1-title-pedone").css('color', "#ffffff");
        context.find("#sel1-content-pedone").css('color', "#ffffff");
        context.find("#sel2-pedone").css('background', "#ffffff");
        context.find("#sel2-title-pedone").css('color', "#1F375F");
        context.find("#sel2-content-pedone").css('color', "#2b353a");
        context.find("#sel3-pedone").css('background', "#ffffff");
        context.find("#sel3-title-pedone").css('color', "#1F375F");
        context.find("#sel3-content-pedone").css('color', "#2b353a");
    }
    else if (element.dataset.value == "comfort") {
        context.find("#PacchettoHidden").val(element.parentElement.dataset.date + "sci-comfort");
        context.find("#sel2-pedone").css('background', "#1F375F");
        context.find("#sel2-title-pedone").css('color', "#ffffff");
        context.find("#sel2-pedone-icons").toggle(false);        
        context.find("#sel2-pedone-icons2").toggle(true);
        context.find("#sel2-pedone-icons3").toggle(false);        
        context.find("#sel2-pedone-icons4").toggle(true);
        context.find("#sel1-pedone-icons2").toggle(false);        
        context.find("#sel1-pedone-icons").toggle(true);
        context.find("#sel3-pedone-icons2").toggle(false);        
        context.find("#sel3-pedone-icons").toggle(true);

        context.find("#sel2-content-pedone").css('color', "#ffffff");
        context.find("#sel1-pedone").css('background', "#ffffff");
        context.find("#sel1-title-pedone").css('color', "#1F375F");
        context.find("#sel1-content-pedone").css('color', "#2b353a");
        context.find("#sel3-pedone").css('background', "#ffffff");
        context.find("#sel3-title-pedone").css('color', "#1F375F");
        context.find("#sel3-content-pedone").css('color', "#2b353a");
    }
    else if (element.dataset.value == "fun") {
        context.find("#PacchettoHidden").val(element.parentElement.dataset.date + "sci-fun");
        context.find("#sel3-pedone").css('background', "#1F375F");
        context.find("#sel3-title-pedone").css('color', "#ffffff");
        context.find("#sel3-pedone-icons").toggle(false);
        context.find("#sel3-pedone-icons2").toggle(true);
        context.find("#sel1-pedone-icons2").toggle(false);
        context.find("#sel1-pedone-icons").toggle(true);
        context.find("#sel2-pedone-icons2").toggle(false);
        context.find("#sel2-pedone-icons").toggle(true);
        context.find("#sel2-pedone-icons4").toggle(false);
        context.find("#sel2-pedone-icons3").toggle(true);
        context.find("#sel3-content-pedone").css('color', "#ffffff");
        context.find("#sel1-pedone").css('background', "#ffffff");
        context.find("#sel1-title-pedone").css('color', "#1F375F");
        context.find("#sel1-content-pedone").css('color', "#2b353a");
        context.find("#sel2-pedone").css('background', "#ffffff");
        context.find("#sel2-title-pedone").css('color', "#1F375F");
        context.find("#sel2-content-pedone").css('color', "#2b353a");
    }

}

function SelezioneSci(element) {
    let context = $("#" + element.parentElement.dataset.date)
    if (element.dataset.value == "slalom") {
        context.find("#PacchettoHidden").val(element.parentElement.dataset.date + "sci-slalom");
        context.find("#sel1-sci").css('background', "#1F375F");
        context.find("#sel1-title-sci").css('color', "#ffffff");
        context.find("#sel1-content-sci").css('color', "#ffffff");
        context.find("#sel2-sci").css('background', "#ffffff");
        context.find("#sel2-title-sci").css('color', "#1F375F");
        context.find("#sel2-content-sci").css('color', "#2b353a");
        context.find("#sel3-sci").css('background', "#ffffff");
        context.find("#sel3-title-sci").css('color', "#1F375F");
        context.find("#sel3-content-sci").css('color', "#2b353a");
    }
    else if (element.dataset.value == "competition") {
        context.find("#PacchettoHidden").val(element.parentElement.dataset.date + "sci-competition");
        context.find("#sel2-sci").css('background', "#1F375F");
        context.find("#sel2-title-sci").css('color', "#ffffff");
        context.find("#sel2-content-sci").css('color', "#ffffff");
        context.find("#sel1-sci").css('background', "#ffffff");
        context.find("#sel1-title-sci").css('color', "#1F375F");
        context.find("#sel1-content-sci").css('color', "#2b353a");
        context.find("#sel3-sci").css('background', "#ffffff");
        context.find("#sel3-title-sci").css('color', "#1F375F");
        context.find("#sel3-content-sci").css('color', "#2b353a");
    }
    else if (element.dataset.value == "experience") {
        context.find("#PacchettoHidden").val(element.parentElement.dataset.date + "sci-experience");
        context.find("#sel3-sci").css('background', "#1F375F");
        context.find("#sel3-title-sci").css('color', "#ffffff");
        context.find("#sel3-content-sci").css('color', "#ffffff");
        context.find("#sel1-sci").css('background', "#ffffff");
        context.find("#sel1-title-sci").css('color', "#1F375F");
        context.find("#sel1-content-sci").css('color', "#2b353a");
        context.find("#sel2-sci").css('background', "#ffffff");
        context.find("#sel2-title-sci").css('color', "#1F375F");
        context.find("#sel2-content-sci").css('color', "#2b353a");
    }

}


function MostraPrezzi(element) {
    let context = $("#" + element.dataset.date)
    if (element.value == "pedone") {
        context.find("#PacchettiPasseggero").toggle(true);
        context.find("#PacchettiSci").toggle(false);
        ruolo = "pedone";
    } else {
        ruolo = "sci";
        context.find("#PacchettiPasseggero").toggle(false);
        context.find("#PacchettiSci").toggle(true);
    }
    context.find("#MostraPrezzi").toggle(true);
}

function toggleDate(changed) {
    let context = $('#' + changed)
    let required = context.find('#ruolo').prop('required');
    // se require == false sto mostrando
    // se required == true sto nascondendo
    context.find("#PacchettoHidden").val(undefined)
    context.toggle('fast');
    context.find('#ruolo').prop('required', !required);
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