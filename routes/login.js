const express = require('express')
const router = express.Router()

// import controller
const controllers = require('../controllers/usercontrollers')

// @type - POST
// @route - /api/auth/login
// @desc - route for logging in users
// @access - PUBLIC
router.post("/login", controllers.login)