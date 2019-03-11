const nodemailer = require('nodemailer');
const { email } = require('../../../.config.js');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

function send(req) {
  const oauth2Client = new OAuth2(
    email.clientID,
    email.clientSecret,
    "https://developers.google.com/oauthplayground"
  )

  oauth2Client.setCredentials({
    refresh_token: email.refreshToken
  });
<<<<<<< HEAD
=======
  /*async function getStuff() {
    const tokens = await oauth2Client.refreshAccessToken();
  }
  const accessToken = tokens.credential.access_token;
  console.log(accessToken);*/
  /*
  const auth = {
    type: 'oauth2',
    user: email.address,
    clientId: email.clientID,
    clientSecret: email.clientSecret,
    refreshToken: email.refreshToken
  };
*/
>>>>>>> 3ae5dfbcf4e00933edad0034ab4b9116cc94076c

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: email.address.address,
      clientId: email.clientID,
      clientSecret: email.clientSecret,
      refreshToken: email.refreshToken
      /*accessToken: accessToken*/
    }
  });

  const mailOptions = {
    from: email.address,
    to: req.mail.emailList,
    subject: req.mail.subject,
    html: req.mail.message
  };

  smtpTransport.sendMail(mailOptions, (err, response) => {
    if (err) {
      return console.log(err);
<<<<<<< HEAD
=======
    } else {
      console.log(response);
>>>>>>> 3ae5dfbcf4e00933edad0034ab4b9116cc94076c
    }
    smtpTransport.close();
  });

}

module.exports = { send }
