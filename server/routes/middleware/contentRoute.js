const Content = require('../../database/models/content.js');
const moment = require('moment');

function setup(req, res, next) {
  const { name, description, price, featured, viewable, images } = req.body;
  const contentSetup = new Content({
    name: name,
    description: description,
    featured: featured,
    price: price,
    viewable: viewable,
    images: images,
    postedDate: moment.utc(),
    lastEditDate: moment.utc()
  });
  contentSetup.save(function(err, content) {
    console.log(err);
    if (err) return next(err);
    res.status('201').json({content: content});
  });
}

function edit(req, res, next) {
  const { name, description, price, featured, viewable, images } = req.body;
  Content.updateOne({_id: req.params.id}, {
    name: name,
    description: description,
    price: price,
    featured: featured,
    viewable: viewable,
    images: images,
    lastEditDate: moment.utc()
  }, {runValidators: true}, function(err, result) {
    res.status('200').json({message: 'Updated'});
  });
}

function pictureMid(req, res, next) {
  if (req.body.hasOwnProperty('images')) {
    const imgArr = req.body.images;
    for (let i = 0; i < imgArr.length; i += 1) {
      if (!imgArr[i].hasOwnProperty('_id')) {
        const data = imgArr[i].data;
        const newData = data.replace(/^data:image\/\w+;base64,/, "");
        const newDataBuf = new Buffer(newData, 'base64');
        imgArr[i].data = newDataBuf;
      }
    }
    req.body.images = imgArr;
  }
  next();
}

function retrieve(req, res, next) {
  Content.find({}, function(err, contents) {
    res.status('200').json({contents: contents})
  });
}

function retrieveSingle(req, res, next) {
  Content.find({_id: req.params.id}, function(err, content) {
    res.status('200').json({content: content})
  });
}

function deleteContent(req, res, next) {
  Content.deleteOne({_id: req.params.id}, function(err) {
    res.status('200').json({message: 'Deleted!'});
  });
}

module.exports = { retrieve, setup, pictureMid, retrieveSingle, edit, deleteContent };
