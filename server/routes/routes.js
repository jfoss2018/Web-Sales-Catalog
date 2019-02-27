const express = require('express');
const router = express.Router();
const loginMid = require('./middleware/loginRoute.js');
const userMid = require('./middleware/userRoute.js');
const pageMid = require('./middleware/pageRoute.js');
const contentMid = require('./middleware/contentRoute.js');
const questionMid = require('./middleware/questionRoute.js');
const appointmentMid = require('./middleware/appointmentRoute.js');
const bidMid = require('./middleware/bidRoute.js');
const fs = require('fs');
const Page = require('../database/models/page.js');

router.get('/', function(req, res, next) {
  console.log('We\'re online');
  res.json({message: 'We did it!'});
});

router.post('/login', loginMid);

router.get('/users', userMid.all);

router.get('/users/:id', userMid.single);

router.put('/users/:id', userMid.edit);

router.delete('/users/:id', userMid.deleteOne);

router.get('/page', pageMid.retrieve);

router.post('/page', pageMid.setup);

router.put('/page/:id', pageMid.pictureMid, pageMid.edit);

router.get('/contents', contentMid.retrieve);

router.get('/contents/bids', bidMid.retrieve);

router.get('/contents/bids/:id', bidMid.retrieveSingle);

router.get('/contents/questions', questionMid.retrieve);

router.get('/contents/questions/:id', questionMid.retrieveSingle);

router.delete('/contents/:id/questions/:qid', questionMid.deleteQuestion, contentMid.deleteQuestion);

router.delete('/contents/:id/bids/:bid', bidMid.deleteBid, contentMid.deleteBid);

router.put('/contents/:id/questions/:qid/answer', questionMid.answerQuestion);

router.put('/contents/:id/bids/:bid', bidMid.edit);

router.get('/contents/:id', contentMid.retrieveSingle);

router.put('/contents/:id', contentMid.pictureMid, contentMid.edit);

router.post('/contents/:id/questions', questionMid.question, contentMid.pushQuestion, contentMid.retrieveSingle);

router.post('/contents/:id/bids', bidMid.setup, contentMid.pushBid);

router.post('/contents', contentMid.pictureMid, contentMid.setup);

router.delete('/contents/:id', contentMid.deleteContent);

router.post('/appointments', appointmentMid.setup);

router.get('/appointments', appointmentMid.retrieve);

router.get('/appointments/:id', appointmentMid.retrieveSingle);

router.put('/appointments/:id', appointmentMid.edit);

router.delete('/appointments/:id', appointmentMid.deleteAppointment);

module.exports = router;
