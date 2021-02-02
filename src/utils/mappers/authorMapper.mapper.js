function map(author, authorBooksList) {
    var newAuthor =  {
        name: author.first_name + " " + author.last_name,
        image: author.image,
        nationality: author.nationality,
        born: author.birth_date,
        died: author.death_date,
        books: authorBooksList
    };
    return {
        author : newAuthor
    };
}

module.exports = { map}
