const express = require('express')
const router = express.Router()
const passport = require('passport')

// import controller
const controllers = require('../controllers/questionControllers')

// @type - POST
// @route - /api/auth/login
// @desc - route for logging in users
// @access - PUBLIC
router.post("/post", passport.authenticate('jwt', { session: false}), controllers.post)

module.exports = router