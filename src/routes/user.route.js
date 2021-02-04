const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
    createUserSchema,
    updateUserSchema,
    validateLogin
} = require('../middleware/validators/userValidator.middleware');

router.get('/', auth(Role.Admin), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users/
router.get('/user', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/user
router.get('/user/library', auth(), awaitHandlerFactory(userController.getUserLibrary)); // localhost:3000/api/v1/users/user/library
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users/
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login
router.get('/logout', awaitHandlerFactory(userController.userLogout)); // localhost:3000/api/v1/users/login
router.post('/user/library', auth(), awaitHandlerFactory(userController.addBookToUserLibrary)); // localhost:3000/api/v1/users/user/library

module.exports = router;
