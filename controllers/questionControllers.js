// Fetch Question Model
const Question = mongoose.model('myQuestion')
// Fetch Profile model
const Profile = require('../model/profile')
// Fetch User model
const User = require('../model/user')

// Fetch Modules
const mongoose = require('mongoose')
const passport = require('passport')

// Post a question
exports.post = async (req, res) => {
  const newQuestion = new Question({
    user: req.user.id,
    textone: req.body.textone,
    texttwo: req.body.texttwo,
    name: req.user.name
  })

  newQuestion.save()
    .then(question => {
      res.json(question)
    })
    .catch(err => console.log("Unable to save question to database", err))
}