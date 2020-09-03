const express=require('express');
require('dotenv').config();
const port=process.env.port || 4000;

//requiring/importing signup route
const signuproute=require('./routes/signUproute');
//requiring/importing bodyparser
const bodyParser=require('body-parser')
//requiring/importing mongoose
const mongoose=require('mongoose')

const app=express();

//body parser to help us post data
app.use(bodyParser.urlencoded({extended:true}))

//express.static to enable us access static files
app.use(bodyParser.json());
// app.use(express.static('public'));

//connecting to the database
mongoose.connect(process.env.eduDb, {useUnifiedTopology:true, useNewUrlParser:true})

//signup route
app.use('/', signuproute)

//checking our port
app.listen(port, ()=>{
    console.log(`listening from http://localhost/${port}`)
})