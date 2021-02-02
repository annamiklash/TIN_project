function getOffset(current_page = 1, listPerPage) {
    return (current_page - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    limit: 5,
    getOffset,
    emptyOrRows

}
