const express = require('express');
const router = express.Router();
const loginMid = require('./middleware/loginRoute.js');
const userMid = require('./middleware/userRoute.js');
const pageMid = require('./middleware/pageRoute.js');
const contentMid = require('./middleware/contentRoute.js');
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

router.get('/contents/:id', contentMid.retrieveSingle);

router.put('/contents/:id', contentMid.pictureMid, contentMid.edit);

router.post('/contents', contentMid.pictureMid, contentMid.setup);

router.delete('/contents/:id', contentMid.deleteContent);

module.exports = router;
