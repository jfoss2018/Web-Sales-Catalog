const express = require('express');
const router = express.Router();
const loginMid = require('./middleware/loginRoute.js');

router.get('/', function(req, res, next) {
  console.log('We\'re online');
  res.json({message: 'We did it!'});
});

router.post('/login', loginMid);

module.exports = router;
