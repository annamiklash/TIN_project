const BookModel = require('../models/book.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Book Controller
 ******************************************************************************/
class BookController {
    getAllBooks = async (req, res, next) => {
        let bookList = await BookModel.find();
        if (!bookList.length) {
            throw new HttpException(404, 'Books not found');
        }

        res.send(bookList);
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new BookController;
