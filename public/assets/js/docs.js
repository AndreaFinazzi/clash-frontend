docInput = data => {
    if (!data.verified) return (
        `<div class="form-group">
            <div class="custom-file">
                <input type="file" class="custom-file-input" id="${data.name}" name="${data.name}" onchange='checkFile(this)'>
                <label class="custom-file-label" for="selfie">${data.label}</label>
            </div>
            <input name="${data.name}" type="hidden" value='{"is_temp":${data.is_temp}}'></input>
            <div class="form-group alarm" id="FileAlarm${data.name}">
                <i class="fas fa-exclamation-triangle" style="padding-right: 10px;"></i>
                Il file caricato é troppo grande, puoi comprimerlo utilizzando uno dei servizi disponibili online.
            </div>
        </div>`
    ); else return (
        `<div class="form-group">
            <div type="file" class="" id="${data.name}">
                ${data.label}:
                <span class="badge badge-success py-1"><i class="fas fa-check-circle px-1"></i>
                <strong>Verificato</strong></span>
            </div>
        </div>`
    )
}

docsForm = $('#docsForm')[0];

$('document').ready(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    window.addEventListener('user-logged', event => {
        if (!window.user.loaded) {
            window.user.loaded = true;
            initDocs();
        }
    })

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
                $('.loader').delay(50).fadeIn('slow');
                var object = {};
                let formData = new FormData($(this)[0]);

                api.docs.submit(formData)
                    .then(response => {
                        if (response.ok) return response.json();
                        if (response.status >= 400) return Promise.reject(response);
                    })
                    .then(data => {
                        if (data.status == 500) return Promise.reject(data);
                        else window.location = "/grazie.html?type=docs&success=true"
                    })
                    .catch(err => window.location = "/sorryforthat.html");
                form.classList.add('was-validated');
            }
        }, false);
    });

});

function initDocs() {
    api.docs.get()
        .then(res => {
            if (res.ok && res.status >= 200) {
                return res.json();
            } else
                return Promise.reject("?type=docs&success=false");
        })
        .then(data => {
            if (Array.isArray(data))
                data.forEach(element => {
                    $('#docsContainer').append(
                        docInput({
                            name: element.id,
                            label: element.value,
                            verified: element.verified,
                            is_temp: element.is_temp ? 1 : 0
                        }))
            })
            else Promise.reject("Invalid data")
        })
        .catch(err => window.location = "/sorryforthat.html?type=payment");
}

function checkFile(element) {
    var files = element.files; // puts all files into an array
    // call them as such; files[0].size will get you the file size of the 0th file
    for (const x in files) {
        var filesize = ((files[x].size / 1024) / 1024).toFixed(2); // MB
        if (files[x].name != "item" && typeof files[x].name != "undefined" && filesize != NaN) {
            if (filesize <= 1) {
                element.setCustomValidity('');
                $('#FileAlarm' + element.id).hide();
            } else {
                element.setCustomValidity('File non valido');
                $('#FileAlarm' + element.id).show();
            }
        }
    }
    updateFormValidity();
}

function updateFormValidity() {
    if (docsForm.checkValidity() === false) {
        $('#docsSubmit').prop('disabled', true)
    } else {
        $('#docsSubmit').prop('disabled', false)
    }
}