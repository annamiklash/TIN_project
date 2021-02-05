function showBookInfo(ISBN) {
    if (ISBN === undefined) {
        alert("ISBN is undefined")
    }

    $.ajax("/api/v1/books/ISBN?ISBN=" + ISBN, {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            let html = buildHtmlForBook(resp);

            $('#data_table_div').html(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function buildHtmlForBook(book) {
    let cookie = document.cookie
    let bookOperations = ""
    if (cookie.startsWith("auth_cookie")) {
        bookOperations = `
      <p> <div class="bookfunc"> 
                        <div class="dropdown"> 
                            <button class="dropbtn">Add To Library</button> 
                            <div class="dropdown-content"> 
                                <a class="book_status" title="Click to do something" href="#" onclick="addToLibraryByStatus('Wish List');return false;">Wish List</a> 
                                <a class="book_status" title="Click to do something" href="#" onclick="addToLibraryByStatus('Finished');return false;">Finished</a> 
                                <a class="book_status" title="Click to do something" href="#" onclick="addToLibraryByStatus('Abandoned');return false;">Abandoned</a> 
                                <a class="book_status" title="Click to do something" href="#" onclick="addToLibraryByStatus('Reading');return false;">Reading</a> 
                            </div> 
                        </div> 
                    </div> </p>
      `
    }


    return `<div class="column">
    <div class="card">
    <div class="container">
     <p> <img src="` + book.image + `" style="max-width: 200px"></p>
      
        <h2>` + book.title + `</h2>
        <p class="title">` + book.author_id + `</p>
        <p>` + book.description + `</p>
        <p>` + book.genre + `</p>
        <p id="book_ISBN">` + book.ISBN + `</p>
        ` + bookOperations + `
      </div>
    </div>
  </div>`
}

async function addToLibraryByStatus(status) {
    $.ajax("api/v1/users/user", {
        type: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            addToLibrary(resp.id, status)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

async function addToLibrary(userId, status) {
    if (userId === undefined) {
        alert("userId is undefined!")
        return;
    }

    let ISBN = $('#book_ISBN').text()
    if (ISBN === undefined) {
        alert("ISBN is undefined!")
        return;
    }

    let myObject = new Object();
    myObject.user_id = userId;
    myObject.status = status;
    myObject.ISBN = ISBN;
    let json = JSON.stringify(myObject);

    $.ajax("/api/v1/users/user/library", {
        type: 'POST',
        contentType: 'application/json',
        data: json,
        success: function (resp) {
            alert("SUCCESS")
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(jqXhr.responseJSON);
        }
    });
}

