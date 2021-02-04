function onMyAccountClickButton() {
    $.ajax("api/v1/users/user", {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            loadMyAccountPage(resp.id)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function loadMyAccountPage(user_id) {
    if (user_id === undefined) {
        alert("user_id is undefined")
        return;
    }

    let url = "/api/v1/users/user/library?id=" + user_id
    $.ajax(url, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildMyAccountHtml(resp)

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}


function buildMyAccountHtml(sectionsArray) {
    let tableHeader = "<table><tr>\n" +
        "    <th>title</th>\n" +
        "    <th>genre</th>\n" +
        "    <th>first_name</th>\n" +
        "    <th>last_name</th>\n" +
        "  </tr>";

    let html = `<div id='my_account_main_div'>`;

    sectionsArray.forEach((section) => {
        let sectionRow = `<h1>Section ` + section.section + `</h1>`
        sectionRow += tableHeader;

        let booksArray = section.books
        booksArray.forEach((book) => {
            let bookRow = "<tr>"
            bookRow += "<td>" + book.title + "</td>"
            bookRow += "<td>" + book.genre + "</td>"
            bookRow += "<td>" + book.first_name + "</td>"
            bookRow += "<td>" + book.last_name + "</td>"
            bookRow += "</tr>"

            sectionRow += bookRow
        })

        sectionRow += "</table>"

        html += sectionRow
    })

    html += '</div>'
    return html
}
