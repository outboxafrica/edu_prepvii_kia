const mongoose = require('mongoose');
const Schema = mongoose.Schema

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

 module.exports=mongoose.model('users', userSchema)