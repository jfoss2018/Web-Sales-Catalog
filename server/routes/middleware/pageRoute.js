const Page = require('../../database/models/page.js');
const defaultImage = require('./defaultImg.js');

function retrieve(req, res, next) {
  Page.find({}, function(err, page) {
    if (err) return next(err);
    if (page.length > 0) {
      const src = `data:${page[0].image.contentType};base64,${page[0].image.data.toString('base64')}`;
      res.status('200').json({page: page[0], src: src});
    } else {
      res.status('200').json({message: 'No Page!'});
    }
  });
}

function pictureMid(req, res, next) {
  if (req.body.hasOwnProperty('image')) {
    if (req.body.image.contentType !== 'image/jpeg') {
      req.body.image.contentType = defaultImage.contentType;
      req.body.image.name = defaultImage.bannerName;
      req.body.image.data = defaultImage.bannerData;
    }
    const { data } = req.body.image;
    const newData = data.replace(/^data:image\/\w+;base64,/, "");
    const newDataBuf = new Buffer.from(newData, 'base64');
    req.body.image.data = newDataBuf;
  }
  next();
}

function edit(req, res, next) {
  Page.updateOne({_id: req.params.id}, req.body, {runValidators: true}, function(err, page) {
    if (err) return next(err);
    res.status('204').json({message: 'Page Updated!'});
  });
}

module.exports = { retrieve, edit, pictureMid };
