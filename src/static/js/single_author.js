function showAuthorInfo(author_id) {
    if (author_id === undefined) {
        alert("author_id is undefined")
    }

    let url = "/api/v1/authors/id?id=" + author_id
    $.ajax(url, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildHtmlForAuthor(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function buildHtmlForAuthor(resp) {
    let author = resp.author
    let authorBooks = resp.authorBooks

    let html = `<div class="column">
    <div class="card">
    <div class="container">
     <p> <img src="` + author.image + `" style="max-width: 200px"></p>
        <h2>` + author.first_name + author.last_name + `</h2>
        <p class="title">` + author.nationality + `</p>
        <p>Birth date: ` + author.birth_date + `</p>
        <p>Death date: ` + author.death_date + `</p>
      </div>
    </div>
  </div>`

    html += buildTableHtmlForAuthor(authorBooks);

    return html;
}

function buildTableHtmlForAuthor(authorBooks) {

    let html = "<table><tr>\n" +
        "    <th>image</th>\n" +
        "    <th>title</th>\n" +
        "    <th>genre</th>\n" +
        "    <th>ISBN</th>\n" +
        "    <th>description</th>\n" +
        "  </tr>"

    authorBooks.forEach((book) => {
        let row = "<tr>"
        row += "<td><img class=\"image\" src=\"" + book.image + "\"></td>"
        row += "<td>" + book.title + "</td>"
        row += "<td>" + book.genre + "</td>"
        row += "<td>" + book.ISBN + "</td>"
        row += "<td>" + book.description + "</td>"
        row += "</tr>"

        html += row
    })

    html += "</table>"

    return html;
}
