//import mongoose
const mongoose=require('mongoose');
const Schema = mongoose.Schema

//create userSchema 
const userSchema= new Schema({
    username:{
        type:String,
        max:20
    },
    name: {
        type: String,
        // required: true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true 
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

 //export model
module.exports = mongoose.model('users', userSchema)