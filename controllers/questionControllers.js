// Fetch Modules
const mongoose = require('mongoose')
const passport = require('passport')

// Fetch Question Model
const Question = require('../model/question').Question
// Fetch Profile model
const Profile = require('../model/profile')
// Fetch User model
const User = require('../model/user')

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

// update a question
exports.update = async (req, res) => {
  console.log("req.body: ", req.body)
  // inserting a update
  let question_id = req.body._id
  let update = {
    textone: req.body.textone,
    texttwo: req.body.texttwo
  };

  // database work logic
  Question.findOneAndUpdate(
    { 
      _id: question_id,
      user: req.user.id
    },
    { $set: update },
    { new: true }, 
  ).then(question => {
    res.status(200).json(question)
  }).catch(err => console.log(`**ERROR** : ${err}`))

  // Question.findByIdAndUpdate(
  //   _id, 
  //   update, 
  //   { new: true }, 
  //   (err, update) => {
  //     if (err) {
  //       console.log("err: ", err)
  //       res.status(500).send(err)
  //     } else {
  //       console.log("success")
  //       res.send(update)
  //     }
  //   }
  // )
}