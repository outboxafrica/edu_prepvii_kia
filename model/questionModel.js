//import mongoose
const mongoose=require('mongoose');

//create questionSchema 
const questionSchema= new mongoose.Schema({
    question: String,
    email: String,
     date:{
         type:Date,
         default:Date.now
     }
 })

 //export model
 module.exports=mongoose.model('questions', questionSchema)