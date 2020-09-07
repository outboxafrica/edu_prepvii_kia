//IMPORT MODULES
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')
// const passport = require('passport')

//IMPORT MODELS
const Question=require('../model/questionModel')


//post a question
exports.postQuestion = (req, res) => {
    let question = new Question({
  
    question: req.body.question,
    email: req.body.email
    });
    question.save(
      res.status(500).json({
          message:"Question created successfully"
      })
    );
  };

  //retrieve all questions
exports.findQuestions=async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
