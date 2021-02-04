$(function () {

    $('.message a').click(function () {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

    $('#login').on("click", function (e) {
        submitLogin();
    });
});

function submitLogin() {
    let email = $('#input_email').val();
    let password = $('#input_password').val();

    let myObject = new Object();
    myObject.email = email;
    myObject.password = password;
    let json = JSON.stringify(myObject);

    $.ajax("api/v1/users/login", {
        type: 'POST',
        contentType: 'application/json',
        data: json,
        success: function (resp) {

            redirectToUserSide();

        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
        }
    });
}

function redirectToUserSide() {

    $.ajax("html/user_side.html", {
        type: 'GET',
        contentType: 'text/html; charset=UTF-8',
        success: function (resp) {
            $('#main_div').html(resp);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
function redirectToGuestSide() {

    $.ajax("html/guest_side.html", {
        type: 'GET',
        contentType: 'text/html; charset=UTF-8',
        success: function (resp) {
            $('#main_div').html(resp);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function signUp() {
    let first_name = $('#create_first_name_input').val();
    let last_name = $('#create_last_name_input').val();
    let username = $('#create_user_name_input').val();
    let email = $('#create_email_input').val();
    let password = $('#create_password_input').val();
    let birthdate = $('#create_birthday_input').val();

    let myObject = new Object();
    myObject.first_name = first_name;
    myObject.last_name = last_name;
    myObject.username = username;
    myObject.email = email;
    myObject.password = password;
    myObject.birthdate = birthdate;
    let json = JSON.stringify(myObject);

    $.ajax("/api/v1/users", {
        type: 'POST',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("User has been created, you can login")
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildErrorsListHtml(jqXhr.responseJSON.errors)
        }
    });
}

function buildErrorsListHtml(errors) {
    let html = "<h2>Errors list</h2>";
    html += '<ul>';

    errors.forEach((error) => {
        html += '<li>' +error.param + ': ' + error.msg + '</li>'
    });

    html += '</ul>';

    $('#error-list').html(html);
}
