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
    .catch(err => {
      console.log("Unable to save question to database", err)
      res.status(500).json({ error: "Failed to save answer!" })
    })
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
  const question_id = req.query.question_id
  const user_id = req.user.id

  Question.findOneAndDelete(
    {
      _id: question_id,
      user: user_id
    }
  ).then(() => {
    res.status(200).json({ message: "Deleted!"})
  }).catch(err => {
    res.status(400).json({ error: "Failed to delete question!"})
  })
}

// View Answers to a Question
exports.getAnswers = async (req, res) => {
  console.log(`**req.params.question_id** : ${req.params.question_id}`)
  Question.find({ _id: req.params.question_id })
    .then(question => {
      console.log(question)

      if (question) {
        // extract the answers
        let answers = question.map(question => question.answers)
        console.log(answers)
        res.status(200).json(answers)
      } else {
        res.status(500).json({ questionNotFound: "Question not found!!!"})
      }
    })
    .catch(err => {
      console.log(`**ERROR** finding question : ${err}`)
      res.status(500).json({ error: "Failed to find question!" })
    })
}

// Accept a preferred answer
exports.acceptAnswer = async (req, res) => {
  const question_id = req.params.question_id 
  const answer_id = req.query.answer_id 

  console.log(`>> question_id : ${question_id}`)
  console.log(`>> answer_id : ${answer_id}`)

  Question.findOneAndUpdate(
    { 
      _id: question_id,
      user: req.user.id,
    },
    { "acceptedAnswer": { id: answer_id }},
    { new: true },
    (err, question) => {
      if (err) throw console.log(`**ERROR** : ${err}`)
      res.status(200).json({ answerAccepted: "Answer Accepted!!!" })
    }
  )
}

// Get all user's questions
exports.getQuestions = async (req, res) => {
  Question.find()
    .sort({ date: "desc" })
    .then(questions => {
      if (questions) {
        console.log('SUCCESS')
        res.status(200).json(questions)
      }
    })
    .catch(err => {
     console.log(`**ERROR** >> finding question: ${err}`)
      res.status(500).json({ error: "Failed to get Questions!" })
    })  
}

// Get a specific question
exports.getQuestion = async (req, res) => {
  const question_id = req.query.question_id

  Question.findById(question_id)
    .then(question => {
      console.log(question)
      res.status(200).json(question)
    })
    .catch(err => {
      console.log(`**ERROR** >> ${err}`)
      res.status(500).json({ error: "Failed to get question!" })
    })
}