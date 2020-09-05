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

// @type - DELETE
// @route = /questions/delete
// @desc - route for deleteing a specific question
// @access - PRIVATE
router.delete("/delete/:question_id", passport.authenticate("jwt", { session: false }), controllers.delete)

module.exports = router