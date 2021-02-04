function manageAuthors() {
    loadAllAuthors(1)
}

function loadAllAuthors(page) {
    let url = "api/v1/authors"
    if (page !== undefined) {
        url += '?page=' + page
    }
    $.ajax(url, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildAuthorsTableHtmlFromJsonArray(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function buildAuthorsTableHtmlFromJsonArray(resp) {
    let authorsArray = resp.data
    let page = resp.current_page

    let html = `<h1>Manage authors</h1>`
    html += `<button type="button" onclick="goToNewAuthorForm()">Add new author</button>`

    html += "<table><tr>\n" +
        "    <th>image</th>\n" +
        "    <th>name</th>\n" +
        "    <th>nationality</th>\n" +
        "    <th>born</th>\n" +
        "    <th>died</th>\n" +
        "    <th>edit</th>\n" +
        "    <th>delete</th>\n" +
        "  </tr>"

    authorsArray.forEach((author) => {
        let row = "<tr>"
        row += "<td><img class=\"image\" src=\"" + author.image + "\"></td>"
        row += "<td>" + author.name + "</td>"
        row += "<td>" + author.nationality + "</td>"
        row += "<td>" + author.born + "</td>"
        row += "<td>" + author.died + "</td>"
        row += "<td><button type=\"button\" onclick=\"goToAuthorEdit(" + author.author_id + ")\">edit</button></td>"
        row += "<td><button type=\"button\" onclick=\"deleteAuthor(" + author.author_id + ")\">delete</button></td>"
        row += "</tr>"

        html += row
    })

    html += "</table>"

    html += buildPaginationFooterForAuthorTable(page)

    return html;
}

function buildPaginationFooterForAuthorTable(currentPage) {
    return '<div class="pagination">' +
        '<button  onclick="onPrevPageAuthorTableButtonClick()">&laquo;</button>' +
        '<strong id="current_page">' + currentPage + '</strong>' +
        '<button onclick="onNextPageAuthorTableButtonClick()">&raquo;</button>' +
        '</div>'
}

function onPrevPageAuthorTableButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    if (currentPage === 1) {
        alert("First page is start");
        return;
    }
    let pageToGo = currentPage - 1

    loadAllAuthors(pageToGo)
}

function onNextPageAuthorTableButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    let pageToGo = currentPage + 1

    loadAllAuthors(pageToGo)
}

function goToAuthorEdit(author_id) {
    if (author_id === undefined) {
        alert("author_id is undefined")
    }

    $.ajax("/api/v1/authors/id?id=" + author_id, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildEditAuthorForm(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function buildEditAuthorForm(resp) {
    let author = resp.author;

    let html = `<h2>Edit author</h2>`

    html += '<div id="error-list"></div>'

    html += `
    <div id="edit_author_div">
        <label for="input_manage_author_first_name">Enter Author First Name:</label>
        <input value='` + author.first_name + `' type="text" id="input_manage_author_first_name" name="input_manage_author_first_name"><br><br>
        <label for="input_manage_author_last_name">Enter Author Last Name:</label>
        <input value='` + author.last_name + `' type="text" id="input_manage_author_last_name" name="input_manage_author_last_name"><br><br>
        <label for="input_manage_author_nationality">Enter Author Nationality:</label>
        <input value='` + author.nationality + `' type="text" id="input_manage_author_nationality" name="input_manage_author_nationality"><br><br>
        <label for="input_manage_author_death_date">Enter Author Death Date (yyyy-mm-dd):</label>
        <input value='` + author.death_date + `' type="text" id="input_manage_author_death_date" name="input_manage_author_death_date"><br><br>
        <label for="input_manage_author_birth_date">Enter Author Birth Date (yyyy-mm-dd):</label>
        <input value='` + author.birth_date + `' type="text" id="input_manage_author_birth_date" name="input_manage_author_birth_date"><br><br>
        <label for="input_manage_author_image">Enter Author Image:</label>
        <input value='` + author.image + `' type="text" id="input_manage_author_image" name="input_manage_author_image"><br><br>
 
    </div>`

    html += `<button type="button" onclick="updateAuthor(` + author.id + `)">Update author</button>`

    return html;

}

function updateAuthor(author_id) {
    if (author_id === undefined) {
        alert("author_id is undefined")
    }
    let first_name = $('#input_manage_author_first_name').val();
    if (first_name === undefined) {
        alert("first_name is undefined")
    }
    let last_name = $('#input_manage_author_last_name').val();
    if (last_name === undefined) {
        alert("last_name is undefined")
    }
    let nationality = $('#input_manage_author_nationality').val();
    if (nationality === undefined) {
        alert("nationality is undefined")
    }
    let death_date = $('#input_manage_author_death_date').val();
    if (death_date === undefined) {
        alert("death_date is undefined")
    }
    let birth_date = $('#input_manage_author_birth_date').val();
    if (birth_date === undefined) {
        alert("birth_date is undefined")
    }
    let image = $('#input_manage_author_image').val();
    if (image === undefined) {
        alert("image is undefined")
    }

    let myObject = new Object();
    myObject.first_name = first_name;
    myObject.last_name = last_name;
    myObject.nationality = nationality;
    if (death_date !== "") {
        myObject.death_date = death_date;
    }
    myObject.birth_date = birth_date;
    myObject.image = image;
    let json = JSON.stringify(myObject);

    let url = '/api/v1/authors/id/' + author_id
    $.ajax(url, {
        type: 'PATCH',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("Author has been updated");
            loadAllAuthors(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildAuthorsErrorsListHtml(jqXhr.responseJSON.errors);
        }
    });
}

function buildAuthorsErrorsListHtml(errors) {
    let html = "<h2>Errors list</h2>";
    html += '<ul>';

    errors.forEach((error) => {
        html += '<li>' + error.param + ': ' + error.msg + '</li>'
    });

    html += '</ul>';

    $('#error-list').html(html);
}

function goToNewAuthorForm() {
    let html = `<h2>New author</h2>`

    html += '<div id="error-list"></div>'

    html += `
    <div id="edit_author_div">
        <label for="input_manage_author_first_name">Enter Author First Name:</label>
        <input value='' type="text" id="input_manage_author_first_name" name="input_manage_author_first_name"><br><br>
        <label for="input_manage_author_last_name">Enter Author Last Name:</label>
        <input value='' type="text" id="input_manage_author_last_name" name="input_manage_author_last_name"><br><br>
        <label for="input_manage_author_nationality">Enter Author Nationality:</label>
        <input value='' type="text" id="input_manage_author_nationality" name="input_manage_author_nationality"><br><br>
        <label for="input_manage_author_death_date">Enter Author Death Date (yyyy-mm-dd):</label>
        <input value='' type="text" id="input_manage_author_death_date" name="input_manage_author_death_date"><br><br>
        <label for="input_manage_author_birth_date">Enter Author Birth Date (yyyy-mm-dd):</label>
        <input value='' type="text" id="input_manage_author_birth_date" name="input_manage_author_birth_date"><br><br>
        <label for="input_manage_author_image">Enter Author Image:</label>
        <input value='' type="text" id="input_manage_author_image" name="input_manage_author_image"><br><br>
    </div>`

    html += `<button type="button" onclick="createAuthor()">Create author</button>`

    $('#data_table_div').html(html);
}

function createAuthor() {
    let first_name = $('#input_manage_author_first_name').val();
    if (first_name === undefined) {
        alert("first_name is undefined")
    }
    let last_name = $('#input_manage_author_last_name').val();
    if (last_name === undefined) {
        alert("last_name is undefined")
    }
    let nationality = $('#input_manage_author_nationality').val();
    if (nationality === undefined) {
        alert("nationality is undefined")
    }
    let death_date = $('#input_manage_author_death_date').val();
    if (death_date === undefined) {
        alert("death_date is undefined")
    }
    let birth_date = $('#input_manage_author_birth_date').val();
    if (birth_date === undefined) {
        alert("birth_date is undefined")
    }
    let image = $('#input_manage_author_image').val();
    if (image === undefined) {
        alert("image is undefined")
    }

    let myObject = new Object();
    myObject.first_name = first_name;
    myObject.last_name = last_name;
    myObject.nationality = nationality;
    if (death_date !== '') {
        myObject.death_date = death_date;
    }
    myObject.birth_date = birth_date;
    myObject.image = image;
    let json = JSON.stringify(myObject);

    $.ajax('/api/v1/authors', {
        type: 'POST',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("Author has been created");
            loadAllAuthors(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildAuthorsErrorsListHtml(jqXhr.responseJSON.errors);
        }
    });
}

function deleteAuthor(author_id) {
    if (author_id === undefined) {
        alert("author_id is undefined")
    }

    let url = '/api/v1/authors/id/' + author_id
    $.ajax(url, {
        type: 'DELETE',
        contentType: 'application/json',
        success: function (resp) {
            alert("Author with author_id " + author_id + " has been deleted");
            loadAllAuthors(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
        }
    });
}
