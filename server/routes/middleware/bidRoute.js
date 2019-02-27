const Bid = require('../../database/models/bid.js');
const moment = require('moment');

function setup(req, res, next) {
  const { name, email, phone, preference, amount } = req.body;
  const bid = new Bid({
    name: name,
    email: email,
    phone: phone,
    preference: preference,
    bidDate: moment.utc(),
    amount: amount,
    content: req.params.id
  });
  bid.save(function(err, bid) {
    req.bid = bid;
    next();
  });
}



module.exports = { setup }
