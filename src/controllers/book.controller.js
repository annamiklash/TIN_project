const BookModel = require('../models/book.model');
const AuthorModel = require('../models/author.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Book Controller
 ******************************************************************************/
class BookController {

    getAllBooks = async (req, res, next) => {
        let bookList = await BookModel.find();
        if (!bookList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Books Not Found');
        }
        let result = [];
        for (let i in bookList) {
            let book = bookList[i];
            let authorId = book.author_id;
            let author = await AuthorModel.findOne(authorId);
            console.log(author)
            result.push({
                title: book.title,
                image: book.image,
                genre: book.genre,
                description: book.description,
                ISBN: book.ISBN,
                author: author.first_name + " " + author.last_name
            })
        }
        return res.status(200).json(result);
    };

    deleteBook = async (req, res, next) => {
        console.log(req.params.ISBN);
        const result = await BookModel.delete(req.params.ISBN);
        if (!result) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Book Not Found');
        }
        return res.send('Book has been deleted');
    };

    searchBookByAnyParameter = async (req, res, next) => {
        console.log(req.query.search)
        const bookList = await BookModel.findMatchingTitle({search: req.query.search});
        if (!bookList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Books Not Found');
        }
        let result = [];
        for (const i in bookList) {
            let book = bookList[i];
            console.log(book.author_id)
            const author = await AuthorModel.findOne(book.author_id);
            result.push({
                title: book.title,
                image: book.image,
                genre: book.genre,
                description: book.description,
                ISBN: book.ISBN,
                author: author.first_name + " " + author.last_name
            })
        }

        return res.send(result);
    };

    getByISBN = async (req, res, next) => {
        console.log(req.query.ISBN);
        const book = await BookModel.findOne({ISBN: req.query.ISBN});

        if (!book) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Book Not Found');
        }

        res.send(book);
    };

    updateBook = async (req, res, next) => {
        this.checkValidation(req);

        const {confirm_password, ...restOfUpdates} = req.body;
        const book = await BookModel.update(restOfUpdates, req.params.ISBN);
        if (!book) {
            return res.status(404).json('Something Went Wrong');
        }
        const {affectedRows, changedRows, info} = book;

        const message = !affectedRows ? 'Book not found' :
            affectedRows && changedRows ? 'Book updated successfully' : 'Updated failed';

        return res.send({message, info});
    };

    addBook = async (req, res, next) => {
        console.log(req.body)
        this.checkValidation(req);

        const result = await BookModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something Went Wrong!');
        }

        return res.status(201).send('Book was added!');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new BookController;
