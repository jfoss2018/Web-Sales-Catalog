const User = require('../../database/models/user.js');
const Page = require('../../database/models/page.js');
const defaultImage = require('./defaultImg.js');
const moment = require('moment');

function checkState(req, res, next) {
  Page.find({}, function(err, pageList) {
    if (err) return next(err);
    if (pageList.length === 0) {
      next();
    } else {
      res.status('400').json({message: 'Page Exists!'});
    }
  })
}

function initUser(req, res, next) {
  User.deleteMany({}, function(err) {
    if (err) return next(err);
    const { username, password, email, phone } = req.body.userObj;
    const newUser = new User({
      username: username,
      password: password,
      email: email,
      phone: phone,
      authorization: '2',
      createDate: moment.utc()
    });
    newUser.save(function(err, savedUser) {
      if (err) return next(err);
      next();
    });
  });
}

function pictureMid(req, res, next) {
  if (req.body.pageObj.hasOwnProperty('image')) {
    if (req.body.pageObj.image.contentType !== 'image/jpeg') {
      req.body.pageObj.image.contentType = defaultImage.contentType;
      req.body.pageObj.image.name = defaultImage.bannerName;
      req.body.pageObj.image.data = defaultImage.bannerData;
    }
    const { data } = req.body.pageObj.image;
    const newData = data.replace(/^data:image\/\w+;base64,/, "");
    const newDataBuf = new Buffer.from(newData, 'base64');
    req.body.pageObj.image.data = newDataBuf;
  }
  next();
}

function initPage(req, res, next) {
  const { image, title, showTitle, search, filter, filterOptions, pagination, allowChange, itemsPerPage, footer, message } = req.body.pageObj;
  const pageSetup = new Page({
    image: {
      name: image.name,
      contentType: image.contentType,
      data: image.data
    },
    title: title,
    showTitle: showTitle,
    search: search,
    filter: filter,
    filterOptions: {
      featured: filterOptions.featured,
      priceLowToHigh: filterOptions.priceLowToHigh,
      priceHighToLow: filterOptions.priceHighToLow,
    },
    pagination: pagination,
    allowChange: allowChange,
    itemsPerPage: itemsPerPage,
    footer: footer,
    message: message
  });
  pageSetup.save(function(err, page) {
    res.status('201').json({page: page});
  });
}

module.exports = { checkState, initUser, pictureMid, initPage }
