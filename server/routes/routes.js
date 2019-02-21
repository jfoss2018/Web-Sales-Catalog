const express = require('express');
const router = express.Router();
const loginMid = require('./middleware/loginRoute.js');
const userMid = require('./middleware/userRoute.js');
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

router.post('/save', function(req, res, next) {
  const { contentType, dataURL } = req.body;
  const img = new Page;

  img.image.contentType = contentType;
  const newData = dataURL.replace(/^data:image\/\w+;base64,/, "");
  const newDataBuf = new Buffer(newData, 'base64');
  //img.image.data = fs.readFileSync(__dirname.join('/Portfolio-BG-LG-2x.jpg'));
  console.log('do we make it here?');
  console.log(newDataBuf);
  img.image.data = newDataBuf;
  img.save(function(err, newImg) {
    if (err) console.log(err);
    res.end();
  });
});

router.get('/pic', function(req, res, next) {
  Page.find({}, function(err, docs) {
    const newImgDoc = docs[0];
    const newImgSrc = 'data:image/jpeg;base64,' + newImgDoc.image.data.toString('base64');
    console.log(newImgSrc);
    res.json({src: newImgSrc});
  });
});

module.exports = router;
