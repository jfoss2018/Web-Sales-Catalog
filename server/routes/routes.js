const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('We\'re online');
  res.end();
});

module.exports = router;
