const User = require('../../database/models/user.js');
const error = require('./errorRoute.js');

function setup(req, res, next) {
  const { username, password, email, phone } = req.body;
  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (user) return next(error.duplicateUser());
    const newUser = new User({
      username: username,
      password: password,
      email: email,
      phone: phone,
      authorization: '0'
    });
    newUser.save(function(err, savedUser) {
      if (err) return next(err);
      res.status('201').json({message: 'User created!'});
    });
  });
}

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

function deleteOne(req, res, next) {
  User.deleteOne({_id: req.params.id}, function(err) {
    res.status('200').json({message: 'Deleted!'});
  });
}

module.exports = { all, single, edit, deleteOne, setup };
