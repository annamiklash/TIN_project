function manageUsers() {
    loadAllUsers(1)
}

function loadAllUsers(page) {
    let url = "api/v1/users"
    if (page !== undefined) {
        url += '?page=' + page
    }
    $.ajax(url, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildUsersTableHtmlFromJsonArray(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
            if (jqXhr.status === 401) {
                logout()
            }
        }
    });
}

function buildUsersTableHtmlFromJsonArray(resp) {
    let usersArray = resp.data
    let page = resp.current_page

    let html = `<h1>Manage users</h1>`
    html += `<button type="button" onclick="goToNewUserForm()">Add new user</button>`

    html += "<table><tr>\n" +
        "    <th>first_name</th>\n" +
        "    <th>last_name</th>\n" +
        "    <th>birth_date</th>\n" +
        "    <th>username</th>\n" +
        "    <th>email</th>\n" +
        "    <th>role</th>\n" +
        "    <th>edit</th>\n" +
        "    <th>delete</th>\n" +
        "  </tr>"

    usersArray.forEach((user) => {
        let row = "<tr>"
        row += "<td>" + user.first_name + "</td>"
        row += "<td>" + user.last_name + "</td>"
        row += "<td>" + user.birth_date + "</td>"
        row += "<td>" + user.username + "</td>"
        row += "<td>" + user.email + "</td>"
        row += "<td>" + user.role + "</td>"
        row += "<td><button type=\"button\" onclick=\"goToUserEdit(" + user.id + ")\">edit</button></td>"
        row += "<td><button type=\"button\" onclick=\"deleteUser(" + user.id + ")\">delete</button></td>"
        row += "</tr>"

        html += row
    })

    html += "</table>"

    html += buildPaginationFooterForUserTable(page)

    return html;
}

function buildPaginationFooterForUserTable(currentPage) {
    return '<div class="pagination">' +
        '<button  onclick="onPrevPageUserTableButtonClick()">&laquo;</button>' +
        '<strong id="current_page">' + currentPage + '</strong>' +
        '<button onclick="onNextPageUserTableButtonClick()">&raquo;</button>' +
        '</div>'
}

function onPrevPageUserTableButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    if (currentPage === 1) {
        alert("First page is start");
        return;
    }
    let pageToGo = currentPage - 1

    loadAllUsers(pageToGo)
}

function onNextPageUserTableButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    let pageToGo = currentPage + 1

    loadAllUsers(pageToGo)
}

function goToUserEdit(user_id) {
    if (user_id === undefined) {
        alert("user_id is undefined")
    }

    $.ajax("/api/v1/users/id?id=" + user_id, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildEditUserForm(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
            if (jqXhr.status === 401) {
                logout()
            }
        }
    });
}

function buildEditUserForm(user) {
    let html = `<h2>Edit user</h2>`

    html += '<div id="error-list"></div>'

    html += `
    <div id="edit_user_div">
        <label for="input_manage_user_first_name">Enter User First Name:</label>
        <input value='` + user.first_name + `' type="text" id="input_manage_user_first_name" name="input_manage_user_first_name"><br><br>
        <label for="input_manage_user_last_name">Enter User Last Name:</label>
        <input value='` + user.last_name + `' type="text" id="input_manage_user_last_name" name="input_manage_user_last_name"><br><br>
        <label for="input_manage_user_birth_date">Enter User Birth Date (yyyy-mm-dd):</label>
        <input value='` + user.birth_date + `' type="text" id="input_manage_user_birth_date" name="input_manage_user_birth_date"><br><br>
        <label for="input_manage_user_username">Enter username:</label>
        <input value='` + user.username + `' type="text" id="input_manage_user_username" name="input_manage_user_username"><br><br>
        <label for="input_manage_user_email">Enter User EMail:</label>
        <input value='` + user.email + `' type="text" id="input_manage_user_email" name="input_manage_user_email"><br><br>
        <label for="input_manage_user_role">Enter User Role:</label>
        <input value='` + user.role + `' type="text" id="input_manage_user_role" name="input_manage_user_role"><br><br>
 
    </div>`

    html += `<button type="button" onclick="updateUser(` + user.id + `)">Update user</button>`

    return html;

}

function updateUser(user_id) {
    if (user_id === undefined) {
        alert("user_id is undefined")
    }
    let first_name = $('#input_manage_user_first_name').val();
    if (first_name === undefined) {
        alert("first_name is undefined")
    }
    let last_name = $('#input_manage_user_last_name').val();
    if (last_name === undefined) {
        alert("last_name is undefined")
    }
    let birth_date = $('#input_manage_user_birth_date').val();
    if (birth_date === undefined) {
        alert("birth_date is undefined")
    }
    let username = $('#input_manage_user_username').val();
    if (username === undefined) {
        alert("username is undefined")
    }
    let email = $('#input_manage_user_email').val();
    if (email === undefined) {
        alert("email is undefined")
    }
    let role = $('#input_manage_user_role').val();
    if (role === undefined) {
        alert("role is undefined")
    }

    let myObject = new Object();
    if (first_name !== "") {
        myObject.first_name = first_name;
    }
    if (last_name !== "") {
        myObject.last_name = last_name;
    }
    if (birth_date !== "") {
        myObject.birth_date = birth_date;
    }
    if (username !== "") {
        myObject.username = username;
    }
    if (email !== "") {
        myObject.email = email;
    }
    if (role !== "") {
        myObject.role = role;
    }
    let json = JSON.stringify(myObject);

    let url = '/api/v1/users/id/' + user_id
    $.ajax(url, {
        type: 'PATCH',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("User with user_id " + user_id + " has been updated");
            loadAllUsers(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildUsersErrorsListHtml(jqXhr.responseJSON.errors);
        }
    });
}

function buildUsersErrorsListHtml(errors) {
    let html = "<h2>Errors list</h2>";
    html += '<ul>';

    errors.forEach((error) => {
        html += '<li>' + error.param + ': ' + error.msg + '</li>'
    });

    html += '</ul>';

    $('#error-list').html(html);
}

function goToNewUserForm() {
    let html = `<h2>New user</h2>`

    html += '<div id="error-list"></div>'

    html += `
    <div id="edit_user_div">
        <label for="input_manage_user_first_name">Enter User First Name:</label>
        <input value='' type="text" id="input_manage_user_first_name" name="input_manage_user_first_name"><br><br>
        <label for="input_manage_user_last_name">Enter User Last Name:</label>
        <input value='' type="text" id="input_manage_user_last_name" name="input_manage_user_last_name"><br><br>
        <label for="input_manage_user_birth_date">Enter User Birth Date (yyyy-mm-dd):</label>
        <input value='' type="text" id="input_manage_user_birth_date" name="input_manage_user_birth_date"><br><br>
        <label for="input_manage_user_username">Enter username:</label>
        <input value='' type="text" id="input_manage_user_username" name="input_manage_user_username"><br><br>
        <label for="input_manage_user_email">Enter User EMail:</label>
        <input value='' type="text" id="input_manage_user_email" name="input_manage_user_email"><br><br>
        <label for="input_manage_user_password">Enter User Password:</label>
        <input value='' type="text" id="input_manage_user_password" name="input_manage_user_password"><br><br>
    </div>`

    html += `<button type="button" onclick="createUser()">Create user</button>`

    $('#data_table_div').html(html);
}

function createUser() {
    let first_name = $('#input_manage_user_first_name').val();
    if (first_name === undefined) {
        alert("first_name is undefined")
    }
    let last_name = $('#input_manage_user_last_name').val();
    if (last_name === undefined) {
        alert("last_name is undefined")
    }
    let birth_date = $('#input_manage_user_birth_date').val();
    if (birth_date === undefined) {
        alert("birth_date is undefined")
    }
    let username = $('#input_manage_user_username').val();
    if (username === undefined) {
        alert("username is undefined")
    }
    let email = $('#input_manage_user_email').val();
    if (email === undefined) {
        alert("email is undefined")
    }
    let password = $('#input_manage_user_password').val();
    if (password === undefined) {
        alert("password is undefined")
    }

    let myObject = new Object();

    myObject.first_name = first_name;
    myObject.last_name = last_name;
    myObject.birth_date = birth_date;
    myObject.username = username;
    myObject.email = email;
    myObject.password = password;

    let json = JSON.stringify(myObject);

    $.ajax('/api/v1/users', {
        type: 'POST',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("User has been created");
            loadAllUsers(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildUsersErrorsListHtml(jqXhr.responseJSON.errors);
        }
    });
}

function deleteUser(user_id) {
    if (user_id === undefined) {
        alert("user_id is undefined")
    }

    let url = '/api/v1/users/id/' + user_id
    $.ajax(url, {
        type: 'DELETE',
        contentType: 'application/json',
        success: function (resp) {
            alert("User with user_id " + user_id + " has been deleted");
            loadAllUsers(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
        }
    });
}
