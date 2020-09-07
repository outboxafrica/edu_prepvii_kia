const express = require('express')
const router = express.Router()
const passport = require('passport')

// import controller
const controllers = require('../controllers/questionControllers')

// @type - POST
// @route - /questions
// @desc - route for posting a question
// @access - PRIVATE
router.post("/", passport.authenticate('jwt', { session: false}), controllers.post)

// @type - POST
// @route - /questions/answers/post
// @desc - route for posting an answer
// @access - PRIVATE
router.post("/:question_id/answers", passport.authenticate('jwt', { session: false }), controllers.postAnswer)


module.exports = router