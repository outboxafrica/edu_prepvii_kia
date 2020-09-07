// Fetch Modules
const mongoose = require('mongoose')
const passport = require('passport')

// Fetch Question Model
const Question = require('../model/questionModel').Question
const Answer = require('../model/questionModel').Answer


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

// Post an answer to a question
exports.postAnswer = async (req, res) => {
  let question_id = req.params.question_id
  console.log(question_id)

  let newAnswer = new Answer(
    {
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
    }
  )

  newAnswer.save((err) => {
    if (err) return console.log(`**ERROR** saving answer: ${err}`)

    Question.findOneAndUpdate(
      { 
        _id: question_id
      },
      { $push: { "answers.0": newAnswer }},
      { new: true}
    ).then(question => {
      console.log(question)
      res.status(200).json(question)
    }).catch(err => {
      console.log(`**ERROR** find and update question : ${err}`)
      res.status(500).json({ failedToUpdate: "Failed to save the answer!"})
    })
  })
}

// Delete a question
exports.delete = async (req, res) => {
  console.log(`req.body: ${req.body}`)
  Question.findOneAndDelete(
    {
      _id: req.body._id,
      user: req.user.id
    }
  ).then(() => {
    res.status(200).json({ message: "Deleted!"})
  }).catch(err => {
    res.status(400).json({ error: err})
  })
}