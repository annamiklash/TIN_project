const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {createAuthorSchema, updateAuthorSchema} = require('../middleware/validators/authorValidator.middleware');

router.get('/', awaitHandlerFactory(authorController.getAllAuthors)); // localhost:3000/api/v1/authors/
router.get('/search', awaitHandlerFactory(authorController.searchByAuthorParams)); // localhost:3000/api/v1/authors/search
router.post('/', createAuthorSchema, auth(Role.Admin), awaitHandlerFactory(authorController.createAuthor)); // localhost:3000/api/v1/authors/
router.get('/id', awaitHandlerFactory(authorController.getAuthorById)); // localhost:3000/api/v1/authors/id/1
router.patch('/id/:id', auth(Role.Admin), updateAuthorSchema, awaitHandlerFactory(authorController.updateAuthor)); // localhost:3000/api/v1/authors/id/1
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(authorController.deleteAuthor)); // localhost:3000/api/v1/authors/id/1

module.exports = router;

