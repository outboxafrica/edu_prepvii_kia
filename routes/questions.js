const express = require('express')
const router = express.Router()
const passport = require('passport')

// import controller
const controllers = require('../controllers/questionControllers')

// @type - POST
// @route - /questions
// @desc - route for posting a question
// @access - PRIVATE
// router.post("/", passport.authenticate('jwt', { session: false}), controllers.post)
router.post("/eduApi.com/questions", passport.authenticate('jwt', { session: false}), controllers.post)

// @type - POST
// @route - /questions/answers/post
// @desc - route for posting an answer
// @access - PRIVATE
// router.post("/:question_id/answers", passport.authenticate('jwt', { session: false }), controllers.postAnswer)
router.post("/eduApi.com/questions/:id/answers", passport.authenticate('jwt', { session: false }), controllers.postAnswer)

// @type - DELETE
// @route - /questions/:question_id
// @desc - route for deleting a specific question
// @access - PRIVATE
//router.delete("/:question_id/delete", passport.authenticate("jwt", { session: false }), controllers.delete)
router.delete("/eduApi.com/questions/:id", passport.authenticate("jwt", { session: false }), controllers.delete)

// @type - GET
// @route - /questions/answers/:question_id
// @desc - route for viewing answers to a question
// @access - PUBLIC
//router.get("/answers/:question_id/get", controllers.getAnswers)
router.get("/eduApi.com/questions/:id/answers", controllers.getAnswers)


// @type - POST
// @route - /questions/:question_id/answers/:answer_id
// @desc - route for accepting a preferred answer
// @access - PRIVATE
// router.post("/:question_id/answers/:answer_id")
router.post("/eduApi.com/question/:id/answers/:id")

// @type - GET
// @route - /questions
// @desc - get all questions written by the user
// @access - PRIVATE
//router.get("/", passport.authenticate('jwt', { session: false }), controllers.getQuestions)
router.get("/eduApi.com/questions", passport.authenticate('jwt', { session: false }), controllers.getQuestions)

// @type - GET
// @route - /questions
// @desc - get a specific question 
// @access - PUBLIC
//router.get("/:question_id", controllers.getQuestion)
router.get("/eduApi.com/questions/:id", controllers.getQuestion)

module.exports = router