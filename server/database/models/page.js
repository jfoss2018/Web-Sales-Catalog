const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PageSchema = new Schema({
  image: {
    name: String,
    contentType: String,
    data: Buffer
  },
  title: {
    type: String,
    maxlength: [18, 'Title has a maximum length of 18 characters.']
  },
  showTitle: {
    type: Boolean,
    required: [true, 'Search boolean is required.']
  },
  search: {
    type: Boolean,
    required: [true, 'Search boolean is required.']
  },
  filter: {
    type: Boolean,
    required: [true, 'Filter boolean is required.']
  },
  filterOptions: {
    featured: {
      type: Boolean,
      required: [true, 'Featured boolean is required.']
    },
    priceLowToHigh: {
      type: Boolean,
      required: [true, 'Price Low to High boolean is required.']
    },
    priceHighToLow: {
      type: Boolean,
      required: [true, 'Price High to Low boolean is required.']
    }
  },
  pagination: {
    type: Boolean,
    required: [true, 'Pagination boolean is required.']
  },
  allowChange: {
    type: Boolean,
    required: [true, 'Allow Change boolean is required.']
  },
  itemsPerPage: {
    type: Number
  },
  footer: {
    type: Boolean,
    required: [true, 'Footer boolean is required.']
  },
  message: {
    type: String,
    maxlength: [50, 'Footer has a maximum length of 50 characters.']
  }
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
