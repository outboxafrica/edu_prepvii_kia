//require express to help us create our server and routes
const express=require('express');
const router=express.Router();
const usercontrollers=require('../controllers/usercontrollers')

router.post('/auth/signup', usercontrollers.signup)



module.exports=router;