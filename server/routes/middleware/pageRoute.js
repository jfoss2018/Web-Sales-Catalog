const Page = require('../../database/models/page.js');

function setup(req, res, next) {
  const { image, title, showTitle, search, filter, featured, priceLowToHigh,
    priceHighToLow, pagination, allowChange, itemsPerPage, footer, message } = req.body;
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
      featured: featured,
      priceLowToHigh: priceLowToHigh,
      priceHighToLow: priceHighToLow,
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

function retrieve(req, res, next) {
  Page.find({}, function(err, page) {
    const src = `data:${page[0].image.contentType};base64,${page[0].image.data.toString('base64')}`;
    res.status('200').json({page: page[0], src: src})
  });
}

/*function retrievePic(req, res, next) {
  Page.find({}, function(req,))
}
router.get('/pic', function(req, res, next) {
  Page.find({}, function(err, docs) {
    const newImgDoc = docs[0];
    const newImgSrc = 'data:image/jpeg;base64,' + newImgDoc.image.data.toString('base64');
    console.log(newImgSrc);
    res.json({src: newImgSrc});
  });
});*/

function pictureMid(req, res, next) {
  console.log('We are right here.');
  console.log(req.body.hasOwnProperty('image'));
  if (req.body.hasOwnProperty('image')) {
    console.log('step1');
    const { data } = req.body.image;
    const newData = data.replace(/^data:image\/\w+;base64,/, "");
    const newDataBuf = new Buffer(newData, 'base64');
    req.body.image.data = newDataBuf;
    console.log(req.body);
  }
  console.log('going through here.');
  next();
}

function edit(req, res, next) {
  console.log(req.body);
  Page.updateOne({_id: req.params.id}, req.body, {runValidators: true}, function(err, page) {
    res.status('200').json({message: 'Updated'})
  });
}

module.exports = { setup, retrieve, edit, pictureMid };
