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
        required:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
     password:String,
     location:String,
     date:{
         type:Date,
         default:Date.now
     }
 })

 //export model
 module.exports=mongoose.model('users', userSchema)