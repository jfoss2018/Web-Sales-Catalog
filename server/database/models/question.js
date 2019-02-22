const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required.']
  },
  name: {
    type: String,
    required: false
  },
  answers: [{
    answer: {
      type: String,
      required: false
    },
    answerName: {
      type: String,
      required: false,
      default: "Management Team"
    },
    answerDate: {
      type: Date,
      required: false
    }
  }],
  askDate: {
    type: Date,
    required: [true, 'Posting date is required.']
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
