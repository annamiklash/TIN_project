const AuthorModel = require('../models/author.model');
const BookModel = require('../models/book.model');
const HttpException = require('../utils/HttpException.utils');
const AuthorMapper = require('../utils/mappers/authorMapper.mapper');
const {validationResult} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Author Controller
 ******************************************************************************/
class AuthorController {

    getAllAuthors = async (req, res, next) => {
        let currentPage = req.query.page

        if (typeof currentPage == 'undefined') {
            currentPage = 1;
        }
        let queryResult = await AuthorModel.find({page: currentPage});
        let authorsList = queryResult.data;
        if (!authorsList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Authors Not Found');
        }
        let data = []

        for (const i in authorsList) {
            let author = authorsList[i]
            let authorBooksList = await BookModel.findBooksByAuthorId(author.id);
            let authorWithBookList = AuthorMapper.map(author, authorBooksList)
            data.push(authorWithBookList);

        }
        return res.send({
            data: data,
            current_page: currentPage
        });
    };

    getAuthorById = async (req, res, nex) => {
        console.log(req.query.id)
        const author = await AuthorModel.findOneById({id: req.query.id});

        if (!author) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url + '. Author Not Found');
        }
        let authorBooks = await BookModel.findBooksByAuthorId(req.query.id);


        return res.send({author, authorBooks});
    }


    searchByAuthorParams = async (req, res, next) => {
        const queryResult = await AuthorModel.findMatching({search: req.query.search, page: req.query.page});
        let authorsList = queryResult.data;

        if (!authorsList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url);

        }
        let data = [];
        let currentPage = queryResult.page;

        for (const i in authorsList) {
            let author = authorsList[i]
            let authorBooksList = await BookModel.findBooksByAuthorId(author.id);
            let authorWithBookList = AuthorMapper.map(author, authorBooksList)
            data.push(authorWithBookList);

        }
        return res.send({
            data: data,
            current_page: currentPage
        });
    };

    createAuthor = async (req, res, next) => {
        this.checkValidation(req);

        const result = await AuthorModel.create(req.body);

        if (!result) {
            return res.status(500).json('Something Went Wrong!');
        }

        return res.status(201).send('User was created!');
    };

    updateAuthor = async (req, res, next) => {

        console.log(req.body)
        this.checkValidation(req);

        const {confirm_password, ...restOfUpdates} = req.body;

        const result = await AuthorModel.update(restOfUpdates, req.params.id);

        if (!result) {
            return res.status(404).json('Something Went Wrong!');
        }

        const {affectedRows, changedRows, info} = result;

        const message = !affectedRows ? 'Author not found' :
            affectedRows && changedRows ? 'Author updated successfully' : 'Updated faild';

        return res.send({message, info});
    };

    deleteAuthor = async (req, res, next) => {
        const result = await AuthorModel.delete(req.params.id);
        if (!result) {
            return res.status(404).json('Author Not Found');
        }
        return res.send('Author has been deleted');
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
module.exports = new AuthorController;
