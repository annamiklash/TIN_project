const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.get('/', function (req, res) {
    awaitHandlerFactory(authorController.getAllAuthors(req, res))
}); // localhost:3000/api/v1/authors/

module.exports = router;
