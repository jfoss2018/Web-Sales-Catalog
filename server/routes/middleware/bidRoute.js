const Bid = require('../../database/models/bid.js');
const moment = require('moment');
const { bidTemp } = require('./createTemplate.js');

function setup(req, res, next) {
  const { name, email, phone, preference, amount } = req.body;
  const bid = new Bid({
    name: name,
    email: email,
    phone: phone,
    preference: preference,
    bidDate: moment.utc(),
    amount: amount,
    amountNum: parseFloat(amount.replace(/[^\d.-]/g, '')),
    content: req.params.id,
    viewed: false
  });
  bid.save(function(err, bid) {
    if (err) return next(err);
    req.bid = bid;
    const subject = 'New Bid!';
    req.mail = {
      subject: subject
    }
    next();
  });
}

function retrieve(req, res, next) {
  Bid.find({}).sort({bidDate: 1}).populate('content', 'name').exec(function(err, bids) {
    if (err) return next(err);
    for (let i = 0; i < bids.length; i += 1) {
      bids[i].contentName = bids[i].content.name;
    }
    res.status('200').json({bids: bids});
  });
}

function retrieveSingle(req, res, next) {
  Bid.findById(req.params.id).populate('content', 'name').exec(function(err, bid) {
    if (err) return next(err);
    res.status('200').json({bid: bid});
  });
}

function edit(req, res, next) {
  Bid.updateOne({_id: req.params.bid}, req.body, {runValidators: true}, function(err, result) {
    if (err) return next(err);
    res.status('204').json({message: 'Bid Updated'});
  });
}

function deleteBid(req, res, next) {
  Bid.deleteOne({_id: req.params.bid}, function(err) {
    if (err) return next(err);
    next();
  });
}

function deletedContent(req, res, next) {
  for (let i = 0; i < req.content.bids.length; i += 1) {
    Bid.deleteOne({_id: req.content.bids[i]._id}, function(err) {
      if (err) return next(err);
    });
  }
  next();
}

module.exports = { setup, retrieve, retrieveSingle, deleteBid, edit, deletedContent }
