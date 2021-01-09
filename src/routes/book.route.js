const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.get('/', auth(),  function(req, res) {
    awaitHandlerFactory(bookController.getAllBooks(req, res))
}); // localhost:3000/api/v1/books/

module.exports = router;
