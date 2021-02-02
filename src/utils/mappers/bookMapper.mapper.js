function map(author, book) {
    var newBook = {
        title: book.title,
        image: book.image,
        genre: book.genre,
        description: book.description,
        ISBN: book.ISBN,
        author: author.first_name + " " + author.last_name
    }

   return  {
        book : newBook
   };
}

module.exports = { map}
