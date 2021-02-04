const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
    createBookSchema,
    updateBookSchema,
} = require('../middleware/validators/bookValidator.middleware');

router.get('/', awaitHandlerFactory(bookController.getAllBooks)); // localhost:3000/api/v1/books/
router.get('/ISBN', awaitHandlerFactory(bookController.getByISBN)); // localhost:3000/api/v1/books/ISBN
router.get('/search', awaitHandlerFactory(bookController.searchBookByAnyParameter)); // localhost:3000/api/v1/books/search
router.post('/', auth(Role.Admin), createBookSchema, awaitHandlerFactory(bookController.addBook)); // localhost:3000/api/v1/books/
router.patch('/ISBN/:ISBN', auth(Role.Admin), updateBookSchema, awaitHandlerFactory(bookController.updateBook)); // localhost:3000/api/v1/books/ISBN/1234567890123
router.delete('/ISBN/:ISBN', auth(Role.Admin), awaitHandlerFactory(bookController.deleteBook)); // localhost:3000/api/v1/books/ISBN/1234567890123

module.exports = router;
