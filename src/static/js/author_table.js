function loadAllAuthors(page) {
    $("#input_book_title").val("")

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

function onInputAuthorNameChange(page) {
    let inputVal = $("#input_author_name").val();
    if (inputVal === "") {
        loadAllAuthors()
    } else {
        let url = "api/v1/authors/search?search=" + inputVal;
        if (page !== undefined) {
            url += '&page=' + page
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
}

function buildAuthorsTableHtmlFromJsonArray(resp) {
    let authorsArrayJson = resp.data
    let page = resp.current_page
    let inputVal = $("#input_author_name").val() === undefined ? "" : $("#input_author_name").val();

    let html = `<label for="input_author_name">Enter Author Name:</label>
<input value="` + inputVal + `" type="text" id="input_author_name" name="input_author_name" onchange="onInputAuthorNameChange()"><br><br>`

    html += "<table><tr>\n" +
        "    <th>image</th>\n" +
        "    <th>name</th>\n" +
        "    <th>nationality</th>\n" +
        "    <th>born</th>\n" +
        "    <th>died</th>\n" +
        "  </tr>"

    authorsArrayJson.forEach((author) => {
        let row = "<tr>"
        row += "<td><img class=\"image\" src=\"" + author.image + "\"></td>"
        row += "<td><a id=\"myLink\" title=\"Click to do something\"  href=\"#\" onclick=\"showAuthorInfo(" + author.author_id + ");return false;\">" + author.name + "</a></td>"
        row += "<td>" + author.nationality + "</td>"
        row += "<td>" + author.born + "</td>"
        row += "<td>" + author.died + "</td>"
        row += "</tr>"

        html += row
    })

    html += "</table>"

    html += buildAuthorTablePaginationFooter(page)

    return html;
}

function buildAuthorTablePaginationFooter(currentPage) {
    return '<div class="pagination">' +
        '<button  onclick="onPrevPageAuthorTableButtonClick()">&laquo;</button>' +
        '<strong id="current_page">' + currentPage + '</strong>' +
        '<button onclick="onNextPageAuthorTableButtonClick()">&raquo;</button>' +
        '</div>'
}

function onPrevPageAuthorTableButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    let inputVal = $("#input_author_name").val();
    if (currentPage === 1) {
        alert("First page is start");
        return;
    }
    let pageToGo = currentPage - 1
    if (inputVal === "") {
        loadAllAuthors(pageToGo)
    } else {
        onInputAuthorNameChange(pageToGo);
    }
}

function onNextPageAuthorTableButtonClick() {
    let currentPage = parseInt($('#current_page').text());
    let inputVal = $("#input_author_name").val();
    let pageToGo = currentPage + 1

    if (inputVal === "") {
        loadAllAuthors(pageToGo)
    } else {
        onInputAuthorNameChange(pageToGo);
    }
}
