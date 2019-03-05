const mongoose = require('mongoose');
const Question = require('./question.js');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ContentSchema = new Schema({
  name: {
    type: String,
    minlength: [4, 'Item Name Invalid. Name must be 4 or more characters.'],
    maxlength: [24, 'Item Name Invalid. Name must be 24 or less characters.'],
    required: [true, 'Item name is required.'],
    unique: true,
    uniqueCaseInsensitive: true
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  featured: {
    type: Boolean,
    required: [true, 'Featured boolean is required.']
  },
  price: {
    type: String,
    required: false
  },
  priceNum: {
    type: Number,
    required: false
  },
  viewable: {
    type: Boolean,
    required: [true, 'Viewable boolean is required.']
  },
  images: [{
    name: String,
    contentType: String,
    data: Buffer
  }],
  bids: [{
    type: ObjectId,
    ref: 'Bid'
  }],
  bidLength: {
    type: Number,
    required: false
  },
  questions: [{
    type: ObjectId,
    ref: 'Question'
  }],
  postedDate: {
    type: Date,
    required: [true, 'Posting Date is required.']
  },
  lastEditDate: {
    type: Date,
    required: [true, 'Last Edit Date is required.']
  }
});

ContentSchema.plugin(uniqueValidator);

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
