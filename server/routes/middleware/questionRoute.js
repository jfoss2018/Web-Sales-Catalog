const Question = require('../../database/models/question.js');
//const Content = require('../../database/models/content.js');
const moment = require('moment');

function question(req, res, next) {
  const { question } = req.body;
  const newQuestion = new Question({
    content: req.params.id,
    question: question,
    askDate: moment.utc()
  });
  newQuestion.save(function(err, q) {
    req.question = q;
    next();
  });
}

function retrieve(req, res, next) {
  Question.find({}, null, {sort: {askDate: -1}}).populate('content', 'name').exec(function(err, questions) {
    res.status('200').json({questions: questions});
  });
}

function retrieveSingle(req, res, next) {
  Question.findById(req.params.id).populate('content', 'name').exec(function(err, question) {
    res.status('200').json({question: question});
  });
}

function deleteQuestion(req, res, next) {
  Question.deleteOne({_id: req.params.qid}, function(err) {
    next();
  });
}

function deletedContent(req, res, next) {
  for (let i = 0; i < req.content.questions.length; i += 1) {
    Question.deleteOne({_id: req.content.questions[i]._id}, function(err) {
      if (err) return next(err);
    });
  }
  next();
}

function answerQuestion(req, res, next) {
  Question.updateOne({_id: req.params.qid}, {answer: {
    answer: req.body.answer,
    answerDate: moment.utc()
  }}, {runValidators: true}, function(err, result) {
    res.status('200').json({message: 'Updated'});
  });
}

module.exports = { question, retrieve, retrieveSingle, deleteQuestion, answerQuestion, deletedContent };
