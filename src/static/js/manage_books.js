function manageBooks() {
    loadAllBooks(1)
}

function loadAllBooks(page) {
    let url = "api/v1/books"
    if (page !== undefined) {
        url += '?page=' + page
    }
    $.ajax(url, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildTableHtmlFromJsonArray(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function buildTableHtmlFromJsonArray(resp) {
    let booksArrayJson = resp.data
    let page = resp.current_page

    let html = `<h1>Manage books</h1>`
    html += `<button type="button" onclick="goToNewBookForm()">Add new book</button>`

    html += "<table><tr>\n" +
        "    <th>image</th>\n" +
        "    <th>title</th>\n" +
        "    <th>author</th>\n" +
        "    <th>genre</th>\n" +
        "    <th>ISBN</th>\n" +
        "    <th>edit</th>\n" +
        "    <th>delete</th>\n" +
        "  </tr>"

    booksArrayJson.forEach((book) => {
        let row = "<tr>"
        row += "<td><img class=\"image\" src=\"" + book.image + "\"></td>"
        row += "<td>" + book.title + "</td>"
        row += "<td>" + book.author + "</td>"
        row += "<td>" + book.genre + "</td>"
        row += "<td>" + book.ISBN + "</td>"
        row += "<td><button type=\"button\" onclick=\"goToBookEdit(" + book.ISBN + ")\">edit</button></td>"
        row += "<td><button type=\"button\" onclick=\"deleteBook(" + book.ISBN + ")\">delete</button></td>"
        row += "</tr>"

        html += row
    })

    html += "</table>"

    html += buildPaginationFooter(page)

    return html;
}

function buildPaginationFooter(currentPage) {
    return '<div class="pagination">' +
        '<button  onclick="onPrevPageButtonClick()">&laquo;</button>' +
        '<strong id="current_page">' + currentPage + '</strong>' +
        '<button onclick="onNextPageButtonClick()">&raquo;</button>' +
        '</div>'
}

function onPrevPageButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    if (currentPage === 1) {
        alert("First page is start");
        return;
    }
    let pageToGo = currentPage - 1

    loadAllBooks(pageToGo)
}

function onNextPageButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    let pageToGo = currentPage + 1

    loadAllBooks(pageToGo)
}

function goToBookEdit(ISBN) {
    if (ISBN === undefined) {
        alert("ISBN is undefined")
    }

    $.ajax("/api/v1/books/ISBN?ISBN=" + ISBN, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildEditBookForm(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function buildEditBookForm(book) {
    let html = `<h2>Edit book</h2>`

    html += '<div id="error-list"></div>'

    html += `
    <div id="edit_book_div">
        <label for="input_manage_book_title">Enter Book Title:</label>
        <input value='` + book.title + `' type="text" id="input_manage_book_title" name="input_manage_book_title"><br><br>
        <label for="input_manage_book_genre">Enter Book Genre:</label>
        <input value='` + book.genre + `' type="text" id="input_manage_book_genre" name="input_manage_book_genre"><br><br>
        <label for="input_manage_book_image">Enter Book Image:</label>
        <input value='` + book.image + `' type="text" id="input_manage_book_image" name="input_manage_book_image"><br><br>
        <label for="input_manage_book_description">Enter Book Description:</label>
        <textarea  rows="2" cols="80" id="input_manage_book_description">` + book.description + `</textarea><br><br>
    </div>`

    html += `<button type="button" onclick="updateBook(` + book.ISBN + `)">Update book</button>`

    return html;

}

function updateBook(ISBN) {
    if (ISBN === undefined) {
        alert("ISBN is undefined")
    }
    let title = $('#input_manage_book_title').val();
    if (title === undefined) {
        alert("title is undefined")
    }
    let genre = $('#input_manage_book_genre').val();
    if (genre === undefined) {
        alert("genre is undefined")
    }
    let image = $('#input_manage_book_image').val();
    if (image === undefined) {
        alert("image is undefined")
    }
    let description = $('#input_manage_book_description').val();
    if (description === undefined) {
        alert("description is undefined")
    }

    let myObject = new Object();
    myObject.title = title;
    myObject.genre = genre;
    myObject.image = image;
    myObject.description = description;
    let json = JSON.stringify(myObject);

    let url = '/api/v1/books/ISBN/' + ISBN
    $.ajax(url, {
        type: 'PATCH',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("Book with ISBN " + ISBN + " has been updated");
            loadAllBooks(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildBooksErrorsListHtml(jqXhr.responseJSON.errors);
        }
    });
}

function buildBooksErrorsListHtml(errors) {
    let html = "<h2>Errors list</h2>";
    html += '<ul>';

    errors.forEach((error) => {
        html += '<li>' + error.param + ': ' + error.msg + '</li>'
    });

    html += '</ul>';

    $('#error-list').html(html);
}

function goToNewBookForm() {
    let html = `<h2>New book</h2>`

    html += '<div id="error-list"></div>'

    html += `
    <div id="edit_book_div">
        <label for="input_manage_book_ISBN">Enter Book ISBN:</label>
        <input value='' type="text" id="input_manage_book_ISBN" name="input_manage_book_ISBN"><br><br>
        <label for="input_manage_book_author_id">Enter Book author_id:</label>
        <input value='' type="number" id="input_manage_book_author_id" name="input_manage_book_author_id"><br><br>
        <label for="input_manage_book_title">Enter Book Title:</label>
        <input value='' type="text" id="input_manage_book_title" name="input_manage_book_title"><br><br>
        <label for="input_manage_book_genre">Enter Book Genre:</label>
        <input value='' type="text" id="input_manage_book_genre" name="input_manage_book_genre"><br><br>
        <label for="input_manage_book_image">Enter Book Image:</label>
        <input value='' type="text" id="input_manage_book_image" name="input_manage_book_image"><br><br>
        <label for="input_manage_book_description">Enter Book Description:</label>
        <textarea  rows="2" cols="80" id="input_manage_book_description"></textarea><br><br>
    </div>`

    html += `<button type="button" onclick="createBook()">Create book</button>`

    $('#data_table_div').html(html);

}

function createBook() {
    let ISBN = $('#input_manage_book_ISBN').val();
    if (ISBN === undefined) {
        alert("ISBN is undefined")
    }
    let author_id = $('#input_manage_book_author_id').val();
    if (author_id === undefined) {
        alert("author_id is undefined")
    }
    let title = $('#input_manage_book_title').val();
    if (title === undefined) {
        alert("title is undefined")
    }
    let genre = $('#input_manage_book_genre').val();
    if (genre === undefined) {
        alert("genre is undefined")
    }
    let image = $('#input_manage_book_image').val();
    if (image === undefined) {
        alert("image is undefined")
    }
    let description = $('#input_manage_book_description').val();
    if (description === undefined) {
        alert("description is undefined")
    }

    let myObject = new Object();
    myObject.ISBN = ISBN;
    myObject.author_id = author_id;
    myObject.title = title;
    myObject.genre = genre;
    myObject.image = image;
    myObject.description = description;
    let json = JSON.stringify(myObject);

    $.ajax('/api/v1/books', {
        type: 'POST',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("Book with ISBN " + ISBN + " has been created");
            loadAllBooks(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
            buildBooksErrorsListHtml(jqXhr.responseJSON.errors);
        }
    });
}

function deleteBook(ISBN) {
    if (ISBN === undefined) {
        alert("ISBN is undefined")
    }

    let url = '/api/v1/books/ISBN/' + ISBN
    $.ajax(url, {
        type: 'DELETE',
        contentType: 'application/json',
        success: function (resp) {
            alert("Book with ISBN " + ISBN + " has been deleted");
            loadAllBooks(1);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON.message);
        }
    });
}
