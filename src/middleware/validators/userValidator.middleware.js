const {body, check} = require('express-validator');
const Role = require('../../utils/userRoles.utils');

exports.createUserSchema = [
    check('username')
        .exists()
        .withMessage('username is required')
        .isLength({min: 3})
        .withMessage('Must be at least 3 chars long'),
    check('first_name')
        .exists()
        .withMessage('Your first name is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 3, max: 20})
        .withMessage('Must be at least 3 chars long and maximam 20 chars long'),
    check('last_name')
        .exists()
        .withMessage('Your last name is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 3, max: 30})
        .withMessage('Must be at least 3 chars long and maximum 30 chars long'),
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser])
        .withMessage('Invalid Role type'),
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({min: 6})
        .withMessage('Password must contain at least 6 characters')
        .isLength({max: 10})
        .withMessage('Password can contain max 10 characters'),
    check('birthdate')
        .exists()
        .matches(/^([0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))$/)
        .withMessage("Format: 'yyyy-mm-dd'"),
];

exports.updateUserSchema = [
    check('username')
        .exists()
        .withMessage("Must provide user email")
        .isLength({min: 3})
        .withMessage('Must be at least 3 chars long'),
    check('first_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 3, max: 20})
        .withMessage('Must be at least 3 chars long and maximam 20 chars long'),
    check('last_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({min: 3, max: 30})
        .withMessage('Must be at least 3 chars long and maximum 30 chars long'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser]),
    check('password')
        .optional()
        .isLength({min: 6})
        .withMessage('Password must contain at least 6 characters')
        .isLength({max: 10})
        .withMessage('Password can contain max 10 characters'),
    check('birthdate')
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
            const allowUpdates = ['username', 'email', 'role', 'first_name', 'last_name', 'birthdate'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];
