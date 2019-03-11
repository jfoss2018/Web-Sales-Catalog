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
    if (err) return next(err);
    req.question = q;
    const subject = 'New Question!';
    req.mail = {
      subject: subject
    }
    next();
  });
}

function retrieve(req, res, next) {
  Question.find({}, null, {sort: {askDate: 1}}).populate('content', 'name').exec(function(err, questions) {
    if (err) return next(err);
    for (let i = 0; i < questions.length; i += 1) {
      questions[i].contentName = questions[i].content.name;
      questions[i].answered = (questions[i].answer.answer) ? true : false;
    }
    res.status('200').json({questions: questions});
  });
}

function retrieveSingle(req, res, next) {
  Question.findById(req.params.id).populate('content', 'name').exec(function(err, question) {
    if (err) return next(err);
    res.status('200').json({question: question});
  });
}

function deleteQuestion(req, res, next) {
  Question.deleteOne({_id: req.params.qid}, function(err) {
    if (err) return next(err);
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
    if (err) return next(err);
    res.status('204').json({message: 'Question Answered!'});
  });
}

module.exports = { question, retrieve, retrieveSingle, deleteQuestion, answerQuestion, deletedContent };
