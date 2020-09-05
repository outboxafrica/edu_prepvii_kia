//import express
const express=require('express');
//import mongoose
const mongoose=require('mongoose')
//import dotenv
require('dotenv').config();
const port=process.env.port || 4000;



//import signup/login route
const signuproute=require('./routes/signUproute');

//import bodyparser
const bodyParser=require('body-parser')


const app=express();

//body parser to help us post data
app.use(bodyParser.urlencoded({extended:true}))
//express.static to enable us access static files
app.use(bodyParser.json());

//connect to the database
mongoose.connect(process.env.eduDb, {useUnifiedTopology:true, useNewUrlParser:true})

//use signup route
app.use('/', signuproute)

//check port
app.listen(port, ()=>{
    console.log(`listening from http://localhost:${port}`)
})