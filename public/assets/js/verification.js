$('#user_email').val(url.get('user_email'));
$('#temp_user_email').val(url.get('temp_user_email'))

$('document').ready(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    $("#verifyForm").on("submit", function (event) {
        event.preventDefault();
        $('.loader').delay(50).fadeIn('slow');
        var object = {};
        let jsonData = $(this).serializeJSON();
        let jsonString = JSON.stringify(jsonData);

        api.auth.verifyTemp(jsonString)
            .then(response => {
                if (response.ok) return response.json();
                if (response.status >= 400) return Promise.reject(response);
            })
            .then(data => {
                if (data.status == 500) return Promise.reject(data);
                else window.location = "/grazie.html?type=verification&success=true" + data.id
            })
            .catch(err => window.location = "/sorryforthat.html");
    });
});
