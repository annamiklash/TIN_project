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

    deleteBook = async (req, res, next) => {
        const result = await BookModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Book not found');
        }
        res.send('Book has been deleted');
    };

    getByTitle = async (req, res, next) => {
        console.log(req.params.title)
        const book = await BookModel.findOne({ title: req.params.title });
        if (!book) {
            throw new HttpException(404, 'Book not found');
        }

        res.send(book);
    };

    updateBook = async (req, res, next) => {
        //this.checkValidation(req);

        //await this.hashPassword(req);

       // const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const book = await BookModel.update({ISBN:  req.params.ISBN});
        if (!book) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = book;

        const message = !affectedRows ? 'Book not found' :
            affectedRows && changedRows ? 'Book updated successfully' : 'Updated failed';

        res.send({ message, info });
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new BookController;
