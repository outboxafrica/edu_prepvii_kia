//require express to help us create our server and routes
const express=require('express');
const router=express.Router();

//import controllers
const usercontrollers=require('../controllers/usercontrollers')



//@type -POST
//@route -/auth/signup
//@desc - route for adding a user to the database
//@type - PUBLIC
router.post('/auth/signup', usercontrollers.signup)

//@type -POST
//@route -/auth/signup
//@desc - route for authenticating a user to log in
//@type - PUBLIC
router.post('/auth/login', usercontrollers.login)

//export router
module.exports=router;