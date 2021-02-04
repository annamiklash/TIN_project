function map(author, authorBooksList) {
    return  {
        author_id: author.id,
        name: author.first_name + " " + author.last_name,
        image: author.image,
        nationality: author.nationality,
        born: author.birth_date,
        died: author.death_date,
        books: authorBooksList
    };

}

module.exports = { map}
