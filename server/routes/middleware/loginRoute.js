const User = require('../../database/models/user.js');

function loginMid(req, res, next) {

  const { username, password, email, phone, authorization } = req.body;

  const newUser = new User({
    username: username,
    password: password,
    email: email,
    phone: phone,
    authorization: authorization
  });
  newUser.save(function(err, savedUser) {
    if (err) return next(err);
    res.status('201').json(savedUser);
  });
}

module.exports = loginMid;
