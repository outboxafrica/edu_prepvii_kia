// import express-validator
const { validationResult } = require('express-validator');

// Fetch Question Model
const Question = require('../model/questionModel');

// Fetch Answer model
const Answer = require('../model/answerModel');

// Post a question
exports.post = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const newQuestion = new Question({
    user: req.user.id,
    textone: req.body.textone,
    texttwo: req.body.texttwo,
    name: req.user.name,
  });

  newQuestion.save()
    .then((question) => res.json(question))
    .catch((err) => {
      console.log('Unable to save question to database', err);
      return res.status(500).json({ error: 'Failed to save answer!' });
    });

  return null;
};

// Post an answer to a question
exports.postAnswer = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const { question_id } = req.params;
  console.log(question_id);

  const newAnswer = new Answer(
    {
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
    },
  );

  newAnswer.save((error) => {
    if (error) return console.log(`**ERROR** saving answer: ${error}`);

    Question.findOneAndUpdate(
      {
        _id: question_id,
      },
      { $push: { 'answers.0': newAnswer } },
      { new: true },
    ).then((question) => {
      console.log(question);
      return res.status(200).json(question);
    }).catch((err) => {
      console.log(`**ERROR** find and update question : ${err}`);
      return res.status(500).json({ failedToUpdate: 'Failed to save the answer!' });
    });

    return null;
  });

  return null;
};

// Delete a question
exports.delete = async (req, res) => {
  const { question_id } = req.params;
  const user_id = req.user.id;

  Question.findOneAndDelete(
    {
      _id: question_id,
      user: user_id,
    },
  ).then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch((err) => {
      console.log(`ERROR >> ${err}`);
      return res.status(400).json({ error: 'Failed to delete question!' });
    });

  return null;
};

// View Answers to a Question
exports.getAnswers = async (req, res) => {
  console.log(`**req.params.question_id** : ${req.params.question_id}`);

  Question.find({ _id: req.params.question_id })
    .then((question) => {
      console.log(question);

      if (question) {
        // extract the answers
        const answers = question.map((questionItem) => questionItem.answers);
        console.log(answers);

        return res.status(200).json(answers);
      }
      return res.status(500).json({ questionNotFound: 'Question not found!!!' });
    })
    .catch((err) => {
      console.log(`**ERROR** finding question : ${err}`);
      return res.status(500).json({ error: 'Failed to find question!' });
    });

  return null;
};

// Accept a preferred answer
exports.acceptAnswer = async (req, res) => {
  const { question_id } = req.params;
  const { answer_id } = req.query;

  console.log(`>> question_id : ${question_id}`);
  console.log(`>> answer_id : ${answer_id}`);

  Question.findOneAndUpdate(
    {
      _id: question_id,
      user: req.user.id,
    },
    { acceptedAnswer: { id: answer_id } },
    { new: true },
    (err) => {
      if (err) throw console.log(`**ERROR** : ${err}`);
      return res.status(200).json({ answerAccepted: 'Answer Accepted!!!' });
    },
  );

  return null;
};

// Get all user's questions
exports.getQuestions = async (req, res) => {
  Question.find()
    .sort({ date: 'desc' })
    .then((questions) => {
      if (questions) {
        console.log('SUCCESS');
        return res.status(200).json(questions);
      }

      return null;
    })
    .catch((err) => {
      console.log(`**ERROR** >> finding question: ${err}`);

      return res.status(500).json({ error: 'Failed to get Questions!' });
    });

  return null;
};

// Get a specific question
exports.getQuestion = async (req, res) => {
  const { question_id } = req.params;

  Question.findById(question_id)
    .then((question) => {
      console.log(question);
      return res.status(200).json(question);
    })
    .catch((err) => {
      console.log(`**ERROR** >> ${err}`);
      return res.status(500).json({ error: 'Failed to get question!' });
    });

  return null;
};
