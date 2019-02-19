const User = require('../../database/models/user.js');

function loginMid(req, res, next) {

  const { username, password, email, phone } = req.body;

  const newUser = new User({
    username: username,
    password: password,
    email: email,
    phone: phone
  });
  newUser.save(function(err, savedUser) {
    if (err) return next(err);
    res.status('201').json(savedUser);
  });
}

module.exports = loginMid;
