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

// @type - DELETE
// @route - /questions/:question_id
// @desc - route for deleting a specific question
// @access - PRIVATE
router.delete("/:question_id/delete", passport.authenticate("jwt", { session: false }), controllers.delete)

// @type - GET
// @route - /questions/answers/:question_id
// @desc - route for viewing answers to a question
// @access - PUBLIC
router.get("/answers/:question_id/get", controllers.getAnswers)


module.exports = router