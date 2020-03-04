$('document').ready(function () {
    $('#loginButton').click(function (e) {
        e.preventDefault();
        tryLogin();
    });

    initModal();
    checkAuth();
    
});


function checkAuth() {
    if (window.user.logged === false) {
        return api.auth.check()
            .then((success) => {
                if (!success) {
                    document.getElementById("logged-icon").style.display = "none";
                    showModal();
                } else {
                    document.getElementById("logged-icon").style.display = "block";
                }
            })
            .catch(res => {
                window.user.logged = false;
                window.user.message = "Network error!"
                showModal();
            })
            .finally($('.loader').delay(500).fadeOut('slow'))
    }
}


function tryLogin() {
    let email = $('#loginMailInput').val();
    let password = $('#loginPasswordInput').val();
    api.auth.login(email, password)
        .then(success => {
            if (success) {
                $('.loader').delay(50).fadeIn('slow');
                window.location = "?type=login&success=true";
            }
            else $('#invalidLoginAlarm').show();
        })
        .catch(result => {
            $('#invalidLoginAlarm').show();
        });
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

function logOut(){
   /******/
   localStorage.removeItem('token');
   window.location.reload();
}

function logIn(){
    /******/
}
