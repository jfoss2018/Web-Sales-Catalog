mongodb://<dbuser>:<dbpassword>@ds139295.mlab.com:39295/heroku_0s7bzwmf

const { databaseKey } = require('../../.config.js');

const config = {};

config.mongoURI = {
  development: `mongodb://${databaseKey.user}:${databaseKey.password}@ds139295.mlab.com:39295/heroku_0s7bzwmf`,
  test: 'mongodb://localhost:27017/testDatabase',
  production: `mongodb://${databaseKey.user}:${databaseKey.password}@ds139295.mlab.com:39295/heroku_0s7bzwmf`
};

module.exports = config;
