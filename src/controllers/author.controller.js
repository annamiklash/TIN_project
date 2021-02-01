const AuthorModel = require('../models/author.model');
const BookModel = require('../models/book.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Author Controller
 ******************************************************************************/
class AuthorController {

    getAllAuthors = async (req, res, next) => {
        let authorsList = await AuthorModel.find();
        if (!authorsList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url);
        }
        let result = [];
        for (const i in authorsList) {
            let author = authorsList[i]
            let authorBooksList = await BookModel.findBooksByAuthorId(author.id);

            let authorWithBookList = {
                image: author.image,
                name: author.first_name + " " + author.last_name,
                nationality: author.nationality,
                born: author.birth_date,
                died: author.death_date,
                books: authorBooksList
            }

            result.push(authorWithBookList);
        }
        return res.status(200).json(result);
    };

    searchByAuthorParams = async (req, res, next) => {

        const authorList = await AuthorModel.findMatching({search: req.query.search});
        if (!authorList.length) {
            return res.status(404).json('Cannot ' + req.method + ' ' + req.url);

        }
        console.log(authorList)
        var result = [];
        for (const i in authorList) {
            let author = authorList[i];
            let authorBooksList = await BookModel.findBooksByAuthorId(author.id);
            result.push({
                image: author.image,
                name: author.first_name + " " + author.last_name,
                nationality: author.nationality,
                born: author.birth_date,
                died: author.death_date,
                books: authorBooksList
            })
        }

        return res.status(200).json(result);
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
