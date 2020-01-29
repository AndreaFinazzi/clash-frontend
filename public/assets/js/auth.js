$('document').ready(function () {
    $('#loginButton').click(function (e) {
        e.preventDefault();
        $('.loader').delay(50).fadeIn('slow');
        tryLogin();
    });

    initModal();
    checkAuth();
});

function checkAuth() {
    if (window.user.logged === false) {
        api.auth.check()
            .then((success) => {
                if (!success) {
                    showModal();
                }

                $('.loader').delay(500).fadeOut('slow');
            })
            .catch(res => {
                window.user.logged = false;
                window.user.message = "Network error!"
                showModal();
            })
    }
}


function tryLogin() {
    let email = $('#loginMailInput').val();
    let password = $('#loginPasswordInput').val();
    api.auth.login(email, password)
        .then(success => {
            if (success) window.location = "?type=login&success=true";
        })
        .catch(result => window.location = result);
}

function initModal() {
    $('#loginModal').on('show.bs.modal', function () {
        $(":root").addClass('modal-open');
    })
    $('#loginModal').on('shown.bs.modal', function () {
        $('#loginMailInput').trigger('focus');
    })
    $('#loginModal').on('hide.bs.modal', function () {
        $(":root").removeClass('modal-open');
    })
    $('#loginModal').modal({
        keyboard: false,
        show: false,
        backdrop: 'static'
    })
}

function showModal() {
    $('#loginModal').modal('show');
}