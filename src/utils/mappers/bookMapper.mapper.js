function map(author, book) {
    return  {
        title: book.title,
        image: book.image,
        genre: book.genre,
        description: book.description,
        ISBN: book.ISBN,
        author: author.first_name + " " + author.last_name,
        author_id: author.id
    }

}

module.exports = { map}
