//import mongoose
const mongoose=require('mongoose');

//create userSchema 
const userSchema= new mongoose.Schema({
     username:{
         type:String,
         max:20
     },
     email: {
        type:String,
        unique:true,
        required:true
    },
     password:String,
     location:String
 })

 //export model
 module.exports=mongoose.model('users', userSchema)