const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
/*
no auth for viewing all books
 */
router.get('/',  function(req, res) {
    awaitHandlerFactory(bookController.getAllBooks(req, res))
}); // localhost:3000/api/v1/books/

/*
no auth for searching by title
 */
router.get('/:title', function (req, res) {
    awaitHandlerFactory(bookController.getByTitle(req, res))
}); // localhost:3000/api/v1/books/:book},

//TODO: add auth(Role.Admin), updateBookSchema(middleware)
router.patch('/id/:id', awaitHandlerFactory(bookController.updateBook)); //

//TODO: add auth(Role.Admin)
router.delete('/id/:id', function (req, res) {
    awaitHandlerFactory(bookController.deleteBook(req, res))
}); // localhost:3000/api/v1/books/id/1},

module.exports = router;
