const User = require('../../database/models/user.js');
const error = require('./errorRoute.js');
const moment = require('moment');
const { userTemp } = require('./createTemplate.js');

function setup(req, res, next) {
  const { username, password, email, phone, authorization } = req.body;
  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (user) return next(error.duplicateUser());
    const newUser = new User({
      username: username,
      password: password,
      email: email,
      phone: phone,
      authorization: authorization || 0,
      createDate: moment.utc()
    });
    newUser.save(function(err, savedUser) {
      if (err) return next(err);
      res.status('201').json({message: 'User created!'});
    });
  });
}

function setupRegister(req, res, next) {
  const { username, password, email, phone } = req.body;
  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (user) return next(error.duplicateUser());
    const newUser = new User({
      username: username,
      password: password,
      email: email,
      phone: phone,
      authorization: 0,
      createDate: moment.utc()
    });
    newUser.save(function(err, savedUser) {
      if (err) return next(err);
      req.user = savedUser;
      const subject = 'New User!';
      req.mail = {
        subject: subject
      }
      userTemp(req, res, next);
      res.status('201').json({message: 'User created!'});
    });
  });
}

function all(req, res, next) {
  User.find({}, null, {sort: {createDate: 1}}, function(err, docs) {
    if (err) return next(err);
    res.status('200').json({users: docs});
  });
}

function single(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, doc) {
    if (err) return next(err);
    res.status('200').json({user: doc});
  });
}

function edit(req, res, next) {
  User.findOne({_id: req.authUser._id}, function(err, user) {
    if (err) return next(err);
    if (user._id.toString() === req.params.id) {
      if (req.body.authorization) {
        return next(error.authUser());
      }
    } else {
      if (req.body.authorization) {
        req.body.authorization = parseInt(req.body.authorization);
      }
    }
    User.updateOne({_id: req.params.id}, req.body, {runValidators: true, context: 'query'}, function(err, result) {
      if (err) return next(err);
      res.status('204').json({message: 'User Updated!'});
    });
  });
}

function deleteOne(req, res, next) {
  User.findOne({_id: req.authUser._id}, function(err, user) {
    if (err) return next(err);
    if (user._id.toString() === req.params.id) {
      return next(error.delUser());
    } else {
      User.deleteOne({_id: req.params.id}, function(err) {
        if (err) return next(err);
        res.status('204').json({message: 'User Deleted!'});
      });
    }
  });
}

module.exports = { all, single, edit, deleteOne, setup, setupRegister };
