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
    for (let i = 0; i < contents.length; i += 1) {
      for (let j = 0; j < contents[i].images.length; j += 1) {
        const newImage = {
          _id: contents[i].images[j]._id,
          name: contents[i].images[j].name,
          contentType: contents[i].images[j].contentType,
          src: `data:${contents[i].images[j].contentType};base64,${contents[i].images[j].data.toString('base64')}`
        }
        contents[i].images[j] = newImage;
      }
    }
    res.status('200').json({contents: contents})
  });
}

function retrieveSingle(req, res, next) {
  Content.findById(req.params.id).populate('questions').exec(function(err, content) {
    for (let i = 0; i < content.images.length; i += 1) {
      const newImage = {
        _id: content.images[i]._id,
        name: content.images[i].name,
        contentType: content.images[i].contentType,
        src: `data:${content.images[i].contentType};base64,${content.images[i].data.toString('base64')}`,
        original: `data:${content.images[i].contentType};base64,${content.images[i].data.toString('base64')}`,
        thumbnail: `data:${content.images[i].contentType};base64,${content.images[i].data.toString('base64')}`
      }
      content.images[i] = newImage;
    }
    res.status('200').json({content: content})
  });
}

function pushQuestion(req, res, next) {
  Content.findById(req.params.id).exec(function(err, content) {
    content.questions.push(req.question);
    content.save(function(err, updatedContnet) {
      next();
    })
  })
}

function deleteContent(req, res, next) {
  Content.deleteOne({_id: req.params.id}, function(err) {
    res.status('200').json({message: 'Deleted!'});
  });
}

module.exports = { retrieve, setup, pictureMid, retrieveSingle, edit, deleteContent, pushQuestion };
