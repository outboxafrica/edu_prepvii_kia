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
    })
}

// Accept a preferred answer
exports.acceptAnswer = async (req, res) => {
  const question_id = req.params.question_id 
  const answer_id = req.params.answer_id 

  console.log(question_id)
  console.log(answer_id)

  Question.findOne(
    { 
      _id: question_id,
      user: req.user.id,
    }
  ).then(question => {
    console.log(question)

    Answer.find(
      { _id: answer_id }
    ).then(answer => {
      console.log(answer)

      question.acceptedAnswer = answer._id 
      question.save()
        .then(questionItem => {
          res.status(200).json(questionItem)
        })
      
    })
    .catch(err => {
      if (err) {
        console.log(`**ERROR** >> ${err}`)
        res.status(500).json(err)
      }
    })
  })
  .catch(err => {
    console.log(`**ERROR** >> ${err}`)
    res.status(500).json(err)
  })
}

// Get all user's questions
exports.getQuestions = async (req, res) => {
  Question.find(
    { 
      user: req.user.id
    }
  ).sort({ date: "desc" })
  .then(questions => {
    if (questions) {
      console.log(`**SUCCESS**`)
      res.status(200).json(questions)
    }
  })
  .catch(err => console.log(`**ERROR** finding question: ${err}`))
}

// Get a specific question
exports.getQuestion = async (res, res) => {
  const question_id = req.params.question_id 

  Question.findById(question_id)
    .then(question => {
      console.log(question)
      res.status(200).json(question)
    })
    .catch(err => {
      console.log(`**ERROR** >> ${err}`)
      res.status(500).json(err)
    })
}