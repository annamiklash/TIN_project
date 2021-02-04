const UserModel = require('../models/user.model');
const BookModel = require('../models/book.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();
        if (!userList.length) {
            return res.status(404).json('User Not Found');
        }

        userList = userList.map(user => {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        });

        return res.send(userList);
    };

    getCurrentUser = async (req, res, next) => {
        const {password, ...userWithoutPassword} = req.currentUser;

        return res.send(userWithoutPassword);
    };

    getUserLibrary = async (req, res, next) => {
        const user = await UserModel.findOne({id: req.query.id});
        if (!user) {
            return res.status(404).json('User Not Found');
        }

        let user_id = user.id;
        const userLibrarySections = await BookModel.findUserBookSections(user_id)

        let result = [];
        for (const i in userLibrarySections) {
            let section = userLibrarySections[i].section;
            let books = await BookModel.findUserBooksBySection([user_id, section]);
            result.push({
                section: section,
                books: books
            })
        }

        return res.send(result);
    };

    addBookToUserLibrary = async (req, res, next) => {
        let isBookInLibrary = await UserModel.isBookInUserLibrary({
            user_id: req.body.user_id,
            ISBN: req.body.ISBN,
            status: req.body.status
        });

        if (isBookInLibrary.book_exists === 1) {
            return res.status(400).json('You already have this book in your repository!');
        }

        const result = await UserModel.addBookToUserLibraryWithStatus({
            user_id: req.body.user_id,
            ISBN: req.body.ISBN,
            status: req.body.status
        })

        if (!result) {
            return res.status(500).json('Something Went Wrong!');
        }

        return res.status(201).send('Book Added to Library');

    }

    createUser = async (req, res, next) => {
        console.log(req.body)

        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            return res.status(500).json('Something Went Wrong!');
        }

        return res.status(201).send('User was created!');
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const {confirm_password, ...restOfUpdates} = req.body;

        const result = await UserModel.update(restOfUpdates, req.params.id);

        if (!result) {
            return res.status(404).json('Something Went Wrong!');
        }

        const {affectedRows, changedRows, info} = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        return res.send({message, info});
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            return res.status(404).json('User Not Found');
        }
        return res.send('User has been deleted');
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const {email, password: pass} = req.body;

        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(401).json('Unable To Login');
        }

        const isMatch = await bcrypt.compare(pass, user.password); //UNCOMMENT IF LOGGING IN WITH HASHED PASSWORD

        if (!isMatch) {
            return res.status(401).json('Incorrect Password');
        }

        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({user_id: user.id.toString()}, secretKey, {
            expiresIn: '24h'
        });

        res.cookie('auth_cookie', token, {maxAge: 86400000});
        console.log('cookie created successfully');

        const {password, ...userWithoutPassword} = user;

        return res.send({...userWithoutPassword, token});
    };

    userLogout = async (req, res, next) => {
        let cookie = req.cookies.auth_cookie;
        if (cookie !== undefined) {
            res.clearCookie("auth_cookie");
        }

        console.log("logout success")
        return res.status(200).json('Logout complete');
    }

    checkValidation = (req) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }

    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;
