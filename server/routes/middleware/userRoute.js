const User = require('../../database/models/user.js');

function all(req, res, next) {
  User.find({}, function(err, docs) {
    res.status('200').json({users: docs});
  })
  /*
  newUser.save(function(err, savedUser) {
    if (err) return next(err);
    res.status('201').json(savedUser);
  });
  */
}

function single(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, doc) {
    res.status('200').json({user: doc});
  });
}

function edit(req, res, next) {
  User.updateOne({_id: req.params.id}, req.body, {runValidators: true}, function(err, result) {
    res.status('200').json({message: 'Updated'});
  });
}

module.exports = { all, single, edit };
