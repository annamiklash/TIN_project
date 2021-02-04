const BookModel = require('../models/book.model');
const AuthorModel = require('../models/author.model');
const HttpException = require('../utils/HttpException.utils');
const BookMapper = require('../utils/mappers/bookMapper.mapper');
const {validationResult} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Book Controller
 ******************************************************************************/
class BookController {

    getAllBooks = async (req, res, next) => {
        let currentPage = req.query.page

        if (typeof currentPage == 'undefined'){
            currentPage = 1;
        }
        let queryResult = await BookModel.find({page: currentPage});
        let bookList = queryResult.data;
        if (!bookList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Books Not Found');
        }
        let data = [];

        for (const i in bookList) {
            let book = bookList[i];
            const author = await AuthorModel.findOne(book.author_id);
            let mappedBook = BookMapper.map(author, book)
            data.push(mappedBook)
        }

        return res.send({
            data: data,
            current_page: currentPage
        });
    };

    searchBookByAnyParameter = async (req, res, next) => {
        let currentPage = req.query.page

        if (typeof currentPage == 'undefined'){
            currentPage = 1;
        }
        const queryResult = await BookModel.findMatchingTitle({search: req.query.search,  page: currentPage});

        let bookList = queryResult.data;
        if (!bookList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Books Not Found');
        }
        let data = [];

        for (const i in bookList) {
            let book = bookList[i];
            const author = await AuthorModel.findOne(book.author_id);
            let mappedBook = BookMapper.map(author, book)
            data.push(mappedBook)
        }

        return res.send({
            data: data,
            current_page: currentPage
        });
    };

    getByISBN = async (req, res, next) => {
        console.log(req.query.ISBN);
        const book = await BookModel.findOne({ISBN: req.query.ISBN});

        if (!book) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Book Not Found');
        }

        return res.send(book);
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

    deleteBook = async (req, res, next) => {
        console.log(req.params.ISBN);
        const result = await BookModel.delete(req.params.ISBN);
        if (!result) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Book Not Found');
        }
        return res.send('Book has been deleted');
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
