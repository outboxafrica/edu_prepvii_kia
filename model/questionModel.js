const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'myUser'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    Default: Date.now
  },
  love: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'myUser'
    }
  }]
})

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser"
  },
  textone: {
    type: String,
    required: true
  },
  texttwo: {
    type: String,
    required: true
  },
  name: {
    type: String
  }, 
  upvotes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'myUser'
    }
  }],
  answers: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'myAnswer'
      }
    }
  ],
  date: {
    type: Date,
    Default: Date.now,
  }
})

module.exports = {
  Answer: mongoose.model('myAnswer', AnswerSchema),
  Question: mongoose.model('myQuestion', QuestionSchema)
}