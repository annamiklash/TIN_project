const AuthorModel = require('../models/author.model');
const BookModel = require('../models/book.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Author Controller
 ******************************************************************************/
class AuthorController {

    getAllAuthors = async (req, res, next) => {
        let authorsList = await AuthorModel.find();
        if (!authorsList.length) {
            throw new HttpException(404, 'Authors not found');
        }
        let authorsListResponse = [];
        for (const i in authorsList) {
            let author = authorsList[i]
            let authorBooksList = await BookModel.findByAuthorId(author.id);

            let authorWithBookList = {
                first_name: author.first_name,
                last_name: author.last_name,
                books: authorBooksList
            }

            authorsListResponse.push(authorWithBookList);
        }

        res.send(authorsListResponse);
    };

    //UPDATE AUTHOR

    //DELETE AUTHOR
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new AuthorController;
