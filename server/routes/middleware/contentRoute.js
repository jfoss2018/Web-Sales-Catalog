const Content = require('../../database/models/content.js');
const moment = require('moment');
const error = require('./errorRoute.js');
const defaultImage = require('./defaultImg.js');
const { bidTemp, questionTemp } = require('./createTemplate.js');

function setup(req, res, next) {
  const { name, description, price, featured, viewable, images } = req.body;
  /*for (let i = 0; i < images.length; i += 1) {
    if (images[i].contentType !== 'image/jpeg') {
      images[i].contentType = 'image/jpeg';
      images[i].data = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAGAAgADASIAAhEBAxEB/8QAHAABAAMAAwEBAAAAAAAAAAAAAAIDBAEFBgcI/8QAVhAAAQEHAQQDCwYHDQgCAwAAAAECAwQFERITYQYHIVEUMXEIF0FVVpOVsbTS4SJzdHWBoRUjJjI1ZfAWJCUnQkVSYmSRssHTGDY3Q0RjctGCkjODlP/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIhEBAQEAAwACAgIDAAAAAAAAAAERAiExEkEDMhMiUWFx/...";
      images[i].name = 'item-default.jpg';
    }
  }*/
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
    if (err) {
      if (err.errors.hasOwnProperty('name')) {
        return next(error.duplicateItem());
      } else {
        return next(err);
      }
    }
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
  }, {runValidators: true, context: 'query'}, function(err, result) {
    if (err) {
      if (err.errors.hasOwnProperty('name')) {
        return next(error.duplicateItem());
      } else {
        return next(err);
      }
    }
    res.status('204').json({message: 'Content Item Updated!'});
  });
}

function pictureMid(req, res, next) {
  if (req.body.hasOwnProperty('images')) {
    const imgArr = req.body.images;
    for (let i = 0; i < imgArr.length; i += 1) {
      if (!imgArr[i].hasOwnProperty('_id')) {
        if (imgArr[i].contentType !== 'image/jpeg') {
          imgArr[i].contentType = defaultImage.contentType;
          imgArr[i].name = defaultImage.itemName;
          imgArr[i].data = defaultImage.itemData;
        }
        const data = imgArr[i].data;
        const newData = data.replace(/^data:image\/\w+;base64,/, "");
        const newDataBuf = new Buffer.from(newData, 'base64');
        imgArr[i].data = newDataBuf;
      }
    }
    req.body.images = imgArr;
  }
  next();
}

function retrieve(req, res, next) {
  Content.find({}, null, {sort: {postedDate: 1}}, function(err, contents) {
    if (err) return next(err);
    for (let i = 0; i < contents.length; i += 1) {
      for (let j = 0; j < contents[i].images.length; j += 1) {
        if (contents[i].images[j].data) {
          const newImage = {
            _id: contents[i].images[j]._id,
            name: contents[i].images[j].name,
            contentType: contents[i].images[j].contentType,
            data: contents[i].images[j].data,
            src: `data:${contents[i].images[j].contentType};base64,${contents[i].images[j].data.toString('base64')}`
          }
          contents[i].images[j] = newImage;
        }
      }
      contents[i].bidLength = contents[i].bids.length;
      if (contents[i].price) {
        contents[i].priceNum = parseFloat(contents[i].price.replace(/[^\d.-]/g, ''));
      }
    }
    res.status('200').json({contents: contents})
  });
}

function retrieveSingle(req, res, next) {
  Content.findById(req.params.id).populate('questions').populate('bids').exec(function(err, content) {
    if (err) return next(err);
    for (let i = 0; i < content.images.length; i += 1) {
      if (content.images[i].data) {
        const newImage = {
          _id: content.images[i]._id,
          name: content.images[i].name,
          contentType: content.images[i].contentType,
          data: content.images[i].data,
          src: `data:${content.images[i].contentType};base64,${content.images[i].data.toString('base64')}`,
          original: `data:${content.images[i].contentType};base64,${content.images[i].data.toString('base64')}`,
          thumbnail: `data:${content.images[i].contentType};base64,${content.images[i].data.toString('base64')}`
        }
        content.images[i] = newImage;
      }
    }
    for (let i = 0; i < content.bids.length; i += 1) {
      if (content.bids[i].amount) {
        content.bids[i].amountNum = parseFloat(content.bids[i].amount.replace(/[^\d.-]/g, ''));
      }
    }
    res.status('200').json({content: content})
  });
}

function retrieveDelete(req, res, next) {
  Content.findById(req.params.id).exec(function(err, content) {
    if (err) return next(err);
    req.content = content;
    next();
  });
}

function pushQuestion(req, res, next) {
  Content.findById(req.params.id).exec(function(err, content) {
    if (err) return next(err);
    content.questions.push(req.question);
    content.save(function(err, updatedContent) {
      req.content = updatedContent;
      questionTemp(req, res, next);
      next();
    })
  })
}

function pushBid(req, res, next) {
  Content.findById(req.params.id).exec(function(err, content) {
    if (err) return next(err);
    content.bids.push(req.bid._id);
    content.save(function(err, updatedContent) {
      req.content = updatedContent;
      bidTemp(req, res, next);
      res.status('201').json({message: 'Your bid was successfully submitted!'});
    });
  });
}

function deleteContent(req, res, next) {
  Content.deleteOne({_id: req.params.id}, function(err) {
    if (err) return next(err);
    res.status('204').json({message: 'Content Item Deleted!'});
  });
}

function deleteQuestion(req, res, next) {
  Content.findById(req.params.id).exec(function(err, content) {
    if (err) return next(err);
    const index = content.questions.indexOf(req.params.qid);
    content.questions.splice(index, 1);
    content.save(function(err, newContent) {
      res.status('204').json({message: 'Question Deleted!'});
    });
  });
}

function deleteBid(req, res, next) {
  Content.findById(req.params.id).exec(function(err, content) {
    if (err) return next(err);
    const index = content.bids.indexOf(req.params.bid);
    content.bids.splice(index, 1);
    content.save(function(err, newContent) {
      res.status('204').json({message: 'Bid Deleted!'});
    });
  });
}

module.exports = { retrieve, setup, pictureMid, retrieveSingle, edit, deleteContent, pushQuestion, deleteQuestion, pushBid, deleteBid, retrieveDelete };
