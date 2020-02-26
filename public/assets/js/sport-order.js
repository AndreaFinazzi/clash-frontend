function AggiornaScuole(val) {
    if (val == "no_school") {
        document.getElementById("scuole-alt").type = "text";
    }
    else {
        document.getElementById("scuole-alt").type = "hidden";
        document.getElementById("scuole-alt").value = val;
    }

}

function AggiornaSport(val) {
    if (val == "no_sport") {
        document.getElementById("sport-alt").type = "text";
    }
    else {
        document.getElementById("sport-alt").type = "hidden";
        document.getElementById("sport-alt").value = val;
    }

}

function AggiornaTaglia(val) {
    if (val == "no_size") {
        document.getElementById("size-alt").type = "text";
    }
    else {
        document.getElementById("size-alt").type = "hidden";
        document.getElementById("size-alt").value = val;
    }

}
