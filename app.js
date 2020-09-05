require('dotenv').config();

const express = require('express');
const port = process.env.port || 4000;

// IMPORT ROUTES
//requiring/importing signup route
const signupRoute=require('./routes/signup');
// import login route
const loginRoute = require('./routes/login')



//requiring/importing bodyparser
const bodyParser = require('body-parser')
//requiring/importing mongoose
const mongoose = require('mongoose')
// import passport
const passport = require('passport')

const app = express();

//body parser to help us post data
app.use(bodyParser.urlencoded({extended:true}))

//express.static to enable us access static files
app.use(bodyParser.json());
// app.use(express.static('public'));

//connecting to the database
mongoose.connect(process.env.eduDb, {useUnifiedTopology:true, useNewUrlParser:true})

// Passport Middleware
app.use(passport.initialize())

// config for jwt token
require("./strategies/jsonwebtoken")(passport)


// ROUTING ROUTING ROUTING //
// Home route
app.get("/", (req, res) => {
    res.send("Hello world, Welcome to Edu_API by KIA")
})
//signup route
app.use('/signup', signupRoute)
// login route
app.use('/login', loginRoute)


//checking our port
app.listen(port, ()=>{
    console.log(`listening from http://localhost/${port}`)
})