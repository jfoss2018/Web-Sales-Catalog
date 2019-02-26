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

module.exports = { question };
