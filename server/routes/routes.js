const express = require('express');
const router = express.Router();
const loginMid = require('./middleware/loginRoute.js');
const userMid = require('./middleware/userRoute.js');
const pageMid = require('./middleware/pageRoute.js');
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

router.get('/page', pageMid.retrieve);

//router.get('/page/pic', pageMid.retrievePic);

router.post('/page', pageMid.setup);

router.put('/page/:id', pageMid.pictureMid, pageMid.edit);

module.exports = router;
