const mongoose = require('mongoose');
const Content = require('./content.js');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const QuestionSchema = new Schema({
  content: {
    type: ObjectId,
    ref: 'Content'
  },
  question: {
    type: String,
    required: [true, 'Question is required.']
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
