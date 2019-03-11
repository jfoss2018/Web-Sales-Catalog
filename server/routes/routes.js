const express = require('express');
const router = express.Router();
const initMid = require('./middleware/initializeRoute.js');
const authMid = require('./middleware/loginRoute.js');
const userMid = require('./middleware/userRoute.js');
const pageMid = require('./middleware/pageRoute.js');
const contentMid = require('./middleware/contentRoute.js');
const questionMid = require('./middleware/questionRoute.js');
const appointmentMid = require('./middleware/appointmentRoute.js');
const bidMid = require('./middleware/bidRoute.js');
const mailMid = require('./middleware/mailRoute.js');

router.get('/login', authMid.checkTokenExists);

router.get('/logout', authMid.logout);

router.post('/login', authMid.login);

router.post('/users', authMid.checkAuth2, userMid.setup);

router.post('/register', userMid.setupRegister); ///////////////////////////////////

router.get('/users', authMid.checkAuth2, userMid.all);

router.get('/users/:id', authMid.checkAuth2, userMid.single);

router.put('/users/:id', authMid.checkAuth2, userMid.edit);

router.delete('/users/:id', authMid.checkAuth2, userMid.deleteOne);

router.get('/page', pageMid.retrieve);

router.post('/initialize', initMid.checkState, initMid.initUser, initMid.pictureMid, initMid.initPage);

router.put('/page/:id', authMid.checkAuth2, pageMid.pictureMid, pageMid.edit);

router.get('/contents', contentMid.retrieve);

router.get('/contents/bids', bidMid.retrieve);

router.get('/contents/bids/:id', bidMid.retrieveSingle);

router.get('/contents/questions', questionMid.retrieve);

router.get('/contents/questions/:id', questionMid.retrieveSingle);

router.delete('/contents/:id/questions/:qid', authMid.checkAuth1, questionMid.deleteQuestion, contentMid.deleteQuestion);

router.delete('/contents/:id/bids/:bid', authMid.checkAuth1, bidMid.deleteBid, contentMid.deleteBid);

router.put('/contents/:id/questions/:qid/answer', authMid.checkAuth1, questionMid.answerQuestion);

router.put('/contents/:id/bids/:bid', authMid.checkAuth1, bidMid.edit);

router.get('/contents/:id', contentMid.retrieveSingle);

router.put('/contents/:id', authMid.checkAuth1, contentMid.pictureMid, contentMid.edit);

router.post('/contents/:id/questions', questionMid.question, contentMid.pushQuestion, contentMid.retrieveSingle); /////////////////////////////////////

router.post('/contents/:id/bids', bidMid.setup, contentMid.pushBid);

router.post('/contents', authMid.checkAuth1, contentMid.pictureMid, contentMid.setup);

router.delete('/contents/:id', authMid.checkAuth1, contentMid.retrieveDelete, questionMid.deletedContent, bidMid.deletedContent, contentMid.deleteContent);

router.post('/appointments', appointmentMid.setup); //////////////////////////////////////////

router.get('/appointments', authMid.checkAuth1, appointmentMid.retrieve);

router.get('/appointments/:id', authMid.checkAuth1, appointmentMid.retrieveSingle);

router.put('/appointments/:id', authMid.checkAuth1, appointmentMid.edit);

router.delete('/appointments/:id', authMid.checkAuth1, appointmentMid.deleteAppointment);

module.exports = router;
