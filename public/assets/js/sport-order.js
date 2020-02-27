
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
