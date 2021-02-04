
function loadAllBooks(page) {
    $("#input_book_title").val("")

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

function onInputBookTitleChange(page) {
    let inputVal = $("#input_book_title").val();
    if (inputVal === "") {
        loadAllBooks()
    } else {
        let url = "api/v1/books/search?search=" + inputVal;
        if (page !== undefined) {
            url += '&page=' + page
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
}

function buildTableHtmlFromJsonArray(resp) {
    let booksArrayJson = resp.data
    let page = resp.current_page
    let inputVal = $("#input_book_title").val() === undefined ? "" : $("#input_book_title").val();

    let html = `<label for="input_book_title">Enter Book Title:</label>
<input value="` + inputVal + `" type="text" id="input_book_title" name="input_book_title" onchange="onInputBookTitleChange()"><br><br>`

    html += "<table><tr>\n" +
        "    <th>image</th>\n" +
        "    <th>title</th>\n" +
        "    <th>author</th>\n" +
        "    <th>genre</th>\n" +
        "    <th>ISBN</th>\n" +
        "  </tr>"

    booksArrayJson.forEach((book) => {
        let row = "<tr>"
        row += "<td><img class=\"image\" src=\"" + book.image + "\"></td>"
        row += "<td><a id=\"myLink\" title=\"Click to do something\"  href=\"#\" onclick=\"showBookInfo(" + book.ISBN + ");return false;\">" + book.title + "</a></td>"
        row += "<td><a id=\"myLink\" title=\"Click to do something\"  href=\"#\" onclick=\"showAuthorInfo(" + book.author_id + ");return false;\">" + book.author + "</a></td>"
        row += "<td>" + book.genre + "</td>"
        row += "<td>" + book.ISBN + "</td>"
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
    let inputVal = $("#input_book_title").val();
    if (currentPage === 1) {
        alert("First page is start");
        return;
    }
    let pageToGo = currentPage - 1
    if (inputVal === "") {
        loadAllBooks(pageToGo)
    } else {
        onInputBookTitleChange(pageToGo);
    }
}

function onNextPageButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    let inputVal = $("#input_book_title").val();
    let pageToGo = currentPage + 1

    if (inputVal === "") {
        loadAllBooks(pageToGo)
    } else {
        onInputBookTitleChange(pageToGo);
    }
}



