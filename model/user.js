const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({

    username:{
        type:String,
        max:20
    },
    name: {
        type: String,
        required: true
      },
    email: {
        type:String,
        unique:true,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    location: {
        location : String
    },
    date: {
        type: Date,
        default: Date.now
    }
 })

 module.exports = mongoose.model('myUser', UserSchema)