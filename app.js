// import dotenv
require('dotenv').config();
// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// import passport
const passport = require('passport');
// import cors
const cors = require('cors');

// Create a port variable
const port = process.env.PORT || 4000;

// import keys
// const keys = require('./config/myDbUrl')

// Database Key
const DB = process.env.MONGO_URL;

// IMPORT ROUTES
// import signup/login route
const signuproute = require('./routes/signUproute');
// import questions route
const questionsRoute = require('./routes/questions');

// create an express app
const app = express();

// use express.json middleware
app.use(express.json());
// express.static to enable us access static files
app.use(express.static('public'));

// // LOCAL DATABASE
// //connect to the database
//  mongoose.connect(DB, {useUnifiedTopology:true, useNewUrlParser:true})

// // CLOUD DATABASE
// connecting to the database
mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('     MongoDb Connected!!! (*_*) '));

// Passport Middleware
app.use(passport.initialize());

// use cors
app.use(cors())

// config for jwt token
require('./strategies/jwtwebtoken')(passport);

// ROUTING ROUTING ROUTING //
// use auth routes
app.use('/api', signuproute);
// use questions routes
app.use('/api/questions', questionsRoute);

// check port
app.listen(port, () => {
  console.log(`listening from http://localhost:${port}`);
});
