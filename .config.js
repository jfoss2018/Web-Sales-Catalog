const databaseKey = {};
databaseKey.user = 'admin';
databaseKey.password = 'WebSales1234!2019';

const jwtConfig = {};
jwtConfig.secret = 'jwtlongsecretthatwillbehardtoguess';

const email = {};
email.address = {
  name: 'Greener Pastures',
  address: 'greenerpastureswebapp@gmail.com'
};
email.clientID = '79642501431-84kt4pd29pg9uk2qoks1dd18a6opci42.apps.googleusercontent.com';
email.clientSecret = 'T9VbyuJFDSuOm3VwdR8xg0sg';
email.refreshToken = '1/pW8KFSTqi4J67a33VE1RL8QrgiGhbF6kpncZUgWlOE8';

module.exports = { databaseKey, jwtConfig, email };
