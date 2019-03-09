const User = require('../../database/models/user.js');
const error = require('./errorRoute.js');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../../.config.js');

function login(req, res, next) {
  const { username, password } = req.body;
  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (!user) return next(error.login());
    if (!user.verifyPassword(password)) {
      return next(error.login());
    }
    if (user.authorization === '0') return next(error.loginAuth());
    const tokenBody = {
      id: user._id.toString(),
      auth: user.authorization
    }
    const token = jwt.sign(tokenBody, jwtConfig.secret, {
      // One week
      expiresIn: 604800
    });
    res.cookie('token_auth', token, {
      httpOnly: true,
      // One week
      maxAge: 604800000
    });
    res.status('200').json({message: 'Login Successful!'});
  });
}

function logout(req, res, next) {
  const token = req.cookies.token_auth;
  if (token) {
    res.clearCookie('token_auth');
    res.status('200').json({message: 'Logout Successful!'});
  } else {
    res.status('200').json({message: 'No token to clear!'});
  }
}

function checkTokenExists(req, res, next) {
  const token = req.cookies.token_auth;
  if (token) {
    const decoded = jwt.verify(token, jwtConfig.secret);
    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) return next(err);
      if (!user) {
        res.status('200').json({message: 'Please login.'});
      }
      if (user) {
        res.status('200').json({
          message: 'Please forward.',
          username: user.username,
          auth: decoded.auth
        });
      }
    });
  } else {
    res.status('200').json({message: 'Please login.'});
  }
}

function checkAuth1(req, res, next) {
  const token = req.cookies.token_auth;
  if (token) {
    const decoded = jwt.verify(token, jwtConfig.secret);
    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) return next(err);
      if (!user) {
        return next(error.forbidden());
      }
      if (user) {
        if (decoded.auth > 0) {
          req.authUser = user;
          next();
        } else {
          return next(error.forbidden());
        }
      }
    });
  } else {
    return next(error.forbidden());
  }
}

function checkAuth2(req, res, next) {
  const token = req.cookies.token_auth;
  if (token) {
    const decoded = jwt.verify(token, jwtConfig.secret);
    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) return next(err);
      if (!user) {
        return next(error.forbidden());
      }
      if (user) {
        if (decoded.auth > 1) {
          req.authUser = user;
          next();
        } else {
          return next(error.forbidden());
        }
      }
    });
  } else {
    return next(error.forbidden());
  }
}

module.exports = { login, logout, checkTokenExists, checkAuth1, checkAuth2 };
