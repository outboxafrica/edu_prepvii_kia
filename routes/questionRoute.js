//require express to help us create our server and routes
const express=require('express');
const router=express.Router();

//import controllers
const questionControllers=require('../controllers/questionControllers')
const authentication=require('../middleware/authentication')


//@type -POST
//@route -/questions
//@desc - route for posting questions
//@type - PRIVATE
router.post('/questions', authentication, questionControllers.postQuestion)

//@type -GET
//@route -/questions
//@desc - route for displaying all questions
//@type - PUBLIC
router.get('/questions', questionControllers.findQuestions)

//export router
module.exports=router;