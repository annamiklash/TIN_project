
function logout() {
    $.ajax("api/v1/users/logout", {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            window.location = '/';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

}
