const AuthorModel = require('../models/author.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Book Controller
 ******************************************************************************/
class AuthorController {
    getAllAuthors = async (req, res, next) => {
        let authorsList = await AuthorModel.findWithDetails();
        if (!authorsList.length) {
            throw new HttpException(404, 'Authors not found');
        }

        res.send(authorsList);
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new AuthorController;
