const {body, check} = require('express-validator');

exports.createAuthorSchema = [
    check('first_name')
        .exists()
        .withMessage('First name is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 2, max: 30})
        .withMessage('Must be at least 2 chars long and maximum 30 chars long'),
    check('last_name')
        .exists()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 2, max: 30})
        .withMessage('Must be at least 2 chars long and maximum 30 chars long'),
    check('nationality')
        .exists()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({max: 30})
        .withMessage('Must be maximum 30 chars long'),
    check('image')
        .exists()
        .withMessage('Image link is required')
        .isLength({max: 500})
        .withMessage('Must be maximum 500 chars long'),
    check('birth_date')
        .exists()
        .matches(/^([0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))$/)
        .withMessage("Format: 'yyyy-mm-dd'"),
    check('death_date')
        .optional()
        .matches(/^([0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))$/)
        .withMessage("Format: 'yyyy-mm-dd'"),
];

exports.updateAuthorSchema = [
    check('first_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 2, max: 30})
        .withMessage('Must be at least 2 chars long and maximum 30 chars long'),
    check('last_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 2, max: 30})
        .withMessage('Must be at least 2 chars long and maximum 30 chars long'),
    check('nationality')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({max: 30})
        .withMessage('Must be maximum 30 chars long'),
    check('image')
        .optional()
        .isLength({max: 500})
        .withMessage('Must be maximum 500 chars long'),
    check('birth_date')
        .optional()
        .matches(/^([0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))$/)
        .withMessage("Format: 'yyyy-mm-dd'"),
    check('death_date')
        .optional()
        .matches(/^([0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))$/)
        .withMessage("Format: 'yyyy-mm-dd'"),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['first_name', 'last_name', 'nationality', 'image', 'birth_date', 'death_date'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
