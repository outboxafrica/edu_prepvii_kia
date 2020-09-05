const express = require('express')
const router = express.Router()
const passport = require('passport')

// import controller
const controllers = require('../controllers/questionControllers')

// @type - POST
// @route - /questions/post
// @desc - route for logging in users
// @access - PRIVATE
router.post("/post", passport.authenticate('jwt', { session: false}), controllers.post)

// @type - POST
// @route - /questions/update
// @desc - route for updating a question
// @access - PRIVATE
router.post("/update", passport.authenticate('jwt', { session: false }), controllers.update)

module.exports = router