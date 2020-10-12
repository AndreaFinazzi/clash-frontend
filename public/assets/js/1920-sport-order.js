// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    checkPaid();

    $("#purchaseForm").on("submit", function (event) {
        event.preventDefault();
        $('.loader').delay(50).fadeIn('slow');
        var object = {};
        let jsonData = $(this).serializeJSON();
        let jsonString = JSON.stringify(jsonData);

        api.purchase(jsonString)
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
    api.getPaidItems('2').then(response => {
        if (response.ok) return response.json();
        if (response.status >= 400) return Promise.reject(response);
    })
        .then(data => {
            if (data.status == 500) return Promise.reject(data);
            else if (data.paid == true) window.location = "/grazie.html?success=true&membership=" + data.id
        })
        .catch(err => window.location = "/sorryforthat.html");
}


function AggiornaScuole(val, custom = false) {
    if (!custom) {
        if (val == "no_school") {
            document.getElementById("scuole-alt").type = "text";
        } else {
            document.getElementById("scuole-alt").type = "hidden";
        }
    }
    document.getElementById("school-hidden").value = val;

}

function AggiornaSport(val) {
    document.getElementById("sport-hidden").value = val;
}

function AggiornaTaglia(val) {
    document.getElementById("size-hidden").value = val;
}

// CASCINET
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
    var valore = document.getElementById("cascinet-hidden").value;
    if (val == valore) {
        document.getElementById("cascinet-hidden").value = "";
        cascinetOff(val);
        return;
    }
    cascinetOn(val);
    document.getElementById("cascinet-hidden").value = 'cascinet-' + val;
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