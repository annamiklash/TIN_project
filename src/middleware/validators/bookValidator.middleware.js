const { body, check } = require('express-validator');

exports.createBookSchema = [
    check('title')
        .exists()
        .withMessage('title is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 character long'),
    check('ISBN')
        .exists()
        .withMessage('ISBN is required')
        .isLength({ min: 13, max : 13 })
        .matches(/^(\d{13})$/)
        .withMessage('Must be 13 digits long'),
    check('image')
        .exists()
        .withMessage('Image link is required')
        .isLength({ max: 500 })
        .withMessage('Must be maximum 500 chars long'),
    check('author_id')
        .exists()
        .withMessage('Author Id required')
        .isNumeric(),
    check('genre')
        .exists()
        .withMessage("Should contain only letters")
        .isLength({max : 50})
        .withMessage('Must be maximum 50 chars long'),
    check('description')
        .exists()
        .isLength({max: 500})
        .withMessage("Must be maximum 500 chars long")
];

exports.updateBookSchema = [
    check('title')
        .exists()
        .withMessage('title is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 character long'),
    check('ISBN')
        .exists()
        .withMessage('ISBN is required')
        .isLength({ min: 13, max : 13 })
        .matches(/^(\d{13})$/)
        .withMessage('Must be 13 digits long'),
    check('image')
        .exists()
        .withMessage('Image link is required')
        .isLength({ max: 500 })
        .withMessage('Must be maximum 500 chars long'),
    check('author_id')
        .exists()
        .withMessage('Author Id required')
        .isNumeric(),
    check('genre')
        .exists()
        .withMessage("Should contain only letters")
        .isLength({max : 50})
        .withMessage('Must be maximum 50 chars long'),
    check('description')
        .optional()
        .isLength({max: 500})
        .withMessage("Must be maximum 500 chars long"),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['title', 'ISBN', 'image', 'author_id', 'genre', 'description'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
