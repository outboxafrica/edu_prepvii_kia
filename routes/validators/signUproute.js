// import express-validator
const { check } = require('express-validator')

exports.signup = [
  check('name').not().isEmpty().isLength({min: 3}).trim().escape().withMessage('Name must have more that 2 characters!'),
  check('username').not().isEmpty().withMessage('Username cannot be empty!'),
  check('email').not().isEmpty().isEmail().normalizeEmail().withMessage('Your email is not valid!'),
  check('confirmPassword', 'Passwords do not match!').custom((value, {req}) => (value === req.body.password)),
  check('location', 'Location must have more than 2 characters!').not().isEmpty().isLength({min: 3}).trim().escape()
]

exports.login = [
  check('email').not().isEmpty().isEmail().normalizeEmail().withMessage('Your email is not valid!'),
  check('password', 'Password cannot be empty!').not().isEmpty().escape()
]
