const Content = require('../../database/models/content.js');

/*function setup(req, res, next) {
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
*/
function retrieve(req, res, next) {
  console.log('we made it here.');
  Content.find({}, function(err, contents) {
    res.status('200').json({contents: contents})
  });
}

module.exports = { retrieve };
