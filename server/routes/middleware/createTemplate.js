const mailMid = require('./mailRoute.js');
const Content = require('../../database/models/content.js');
const User = require('../../database/models/user.js');
const moment = require('moment');

function bidTemp(req, res, next) {
  User.find({authorization: {$gt: 0}}, function(err, users) {
    if (err) return next(err);
    let emailList;
    for (let i = 0; i < users.length; i += 1) {
      if (i === 0) {
        emailList = `${users[i].email}`;
      } else {
        emailList += `, ${users[i].email}`;
      }
    }
    req.mail.emailList = emailList;
    Content.findById({_id: req.content._id}).populate({path: 'bids', options: {sort: {'amountNum': -1}}}).exec(function(err, newCont) {
      const newContentName = `<span>${newCont.name}</span>`;
      const subDate = `<span class="p"> on </span><span>${moment(req.bid.bidDate).format('LLL')}</span>`
      let highestBid = {
        amount: 'No bid',
        value: 0
      };
      if (newCont.bids.length > 0) {
        highestBid.amount = newCont.bids[0].amount;
        highestBid.value = newCont.bids[0].amountNum;
      }
      let currentBid = {
        amount: req.bid.amount,
        value: req.bid.amountNum
      }
      let hasPrice = '';
      if (newCont.price) {
        hasPrice = `<span class="p"> which has a current price of </span><span>${newCont.price}</span>`;
      }
      let insertMessage = `<h2>New Bid</h2><h4>This bid is not the highest bid. The highest bid is ${highestBid.amount}.</h4>`;
      if (highestBid.value === currentBid.value) {
        insertMessage = '<h2>New High Bid</h2>';
      }
      let insertPhone = '';
      if (req.bid.phone) {
        insertPhone = `<p>Contact Phone: <span>${req.bid.phone}</span></p>`;
      }
      let insertEmail = '';
      if (req.bid.email) {
        insertEmail = `<p>Contact Email: <span>${req.bid.email}</span></p>`;
      }
      let message = `
        <html>
          <head>
            <style>
              h2 {
                color: #333;
                font-weight: normal;
                font-size: 24px;
              }
              h4 {
                color: #333;
                font-weight: normal;
                font-size: 20px;
              }
              p {
                color: #333;
                font-size: 14px;
                font-weight: normal;
              }
              span {
                font-weight: bold;
                font-size: 18px;
              }
              span.p {
                font-size: 14px;
                font-weight: normal;
                color: #333;
              }
            </style>
          </head>
          <body>
            <div>
              ${insertMessage}
              <span class="p">The following bid was submitted on </span>${newContentName}${hasPrice}${subDate}<span class="p">.</span>
              <p>Bidder: <span>${req.bid.name}</span></p>
              <p>Bid Amount: <span>${req.bid.amount}</span></p>
              <p>Contact Preference: <span>${req.bid.preference}</span></p>
              ${insertPhone}
              ${insertEmail}
              <p>Please do not respond to this email!</p>
            </div>
          <body>
        </html>
      `;
      req.mail.message = message;
      mailMid.send(req);
    });
  });
}

function questionTemp(req, res, next) {
  User.find({authorization: {$gt: 0}}, function(err, users) {
    if (err) return next(err);
    let emailList;
    for (let i = 0; i < users.length; i += 1) {
      if (i === 0) {
        emailList = `${users[i].email}`;
      } else {
        emailList += `, ${users[i].email}`;
      }
    }
    req.mail.emailList = emailList;
    let message = `
      <html>
        <head>
          <style>
            h2 {
              color: #333;
              font-weight: normal;
              font-size: 24px;
            }
            h4 {
              color: #333;
              font-weight: normal;
              font-size: 20px;
            }
            p {
              color: #333;
              font-size: 14px;
              font-weight: normal;
            }
            span {
              font-weight: bold;
              font-size: 18px;
            }
            span.p {
              font-size: 14px;
              font-weight: normal;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div>
            <h2>New Question</h2>
            <p>The following is a new question about <span>${req.content.name}</span> asked on <span>${moment(req.question.askDate).format('LLL')}</span>.</p>
            <p>Question:</p>
            <p><span>"${req.question.question}"</span></p>
            <p>Questions can be ansered on your dashboard.</p>
            <p>Please do not respond to this email!</p>
          </div>
        <body>
      </html>
    `;
    req.mail.message = message;
    mailMid.send(req);
  });
}

function appointmentTemp(req, res, next) {
  User.find({authorization: {$gt: 0}}, function(err, users) {
    if (err) return next(err);
    let emailList;
    for (let i = 0; i < users.length; i += 1) {
      if (i === 0) {
        emailList = `${users[i].email}`;
      } else {
        emailList += `, ${users[i].email}`;
      }
    }
    req.mail.emailList = emailList;
    let insertPhone = '';
    if (req.appointment.phone) {
      insertPhone = `<p>Contact Phone: <span>${req.appointment.phone}</span></p>`;
    }
    let insertEmail = '';
    if (req.appointment.email) {
      insertEmail = `<p>Contact Email: <span>${req.appointment.email}</span></p>`;
    }
    let message = `
      <html>
        <head>
          <style>
            h2 {
              color: #333;
              font-weight: normal;
              font-size: 24px;
            }
            h4 {
              color: #333;
              font-weight: normal;
              font-size: 20px;
            }
            p {
              color: #333;
              font-size: 14px;
              font-weight: normal;
            }
            span {
              font-weight: bold;
              font-size: 18px;
            }
            span.p {
              font-size: 14px;
              font-weight: normal;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div>
            <h2>New Appointment Request</h2>
            <p>The following is a new appointment request posted on <span>${moment(req.appointment.postedDate).format('LLL')}</span>.</p>
            <p>Name: <span>${req.appointment.name}</span></p>
            <p>Contact Preference: <span>${req.appointment.preference}</span></p>
            ${insertPhone}
            ${insertEmail}
            <p>Preferred appointment date and time: <span>${moment(req.appointment.preferredDate).format('LLL')}</span></p>
            <p>Please do not respond to this email!</p>
          </div>
        <body>
      </html>
    `;
    req.mail.message = message;
    mailMid.send(req);
  });
}

function userTemp(req, res, next) {
  User.find({authorization: {$gt: 1}}, function(err, users) {
    if (err) return next(err);
    let emailList;
    for (let i = 0; i < users.length; i += 1) {
      if (i === 0) {
        emailList = `${users[i].email}`;
      } else {
        emailList += `, ${users[i].email}`;
      }
    }
    req.mail.emailList = emailList;
    let message = `
      <html>
        <head>
          <style>
            h2 {
              color: #333;
              font-weight: normal;
              font-size: 24px;
            }
            h4 {
              color: #333;
              font-weight: normal;
              font-size: 20px;
            }
            p {
              color: #333;
              font-size: 14px;
              font-weight: normal;
            }
            span {
              font-weight: bold;
              font-size: 18px;
            }
            span.p {
              font-size: 14px;
              font-weight: normal;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div>
            <h2>New User</h2>
            <p>A new user has recently registered on your app.</p>
            <p>Take a look at their user profile and edit their authorization level in order to give them access to your app.</p>
            <p>Please do not respond to this email!</p>
          </div>
        <body>
      </html>
    `;
    req.mail.message = message;
    mailMid.send(req);
  });
}

module.exports = { bidTemp, questionTemp, appointmentTemp, userTemp }
