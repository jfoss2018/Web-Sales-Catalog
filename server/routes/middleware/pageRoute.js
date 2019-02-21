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
    res.status('200').json({page: page[0]})
  })
}

function edit(req, res, next) {
  console.log(req.body);
  Page.updateOne({_id: req.params.id}, req.body, {runValidators: true}, function(err, page) {
    res.status('200').json({message: 'Updated'})
  })
}

module.exports = { setup, retrieve, edit };
