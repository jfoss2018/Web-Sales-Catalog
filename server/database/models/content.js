const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ContentSchema = new Schema({
  name: {
    type: String,
    minlength: [4, 'Item Name Invalid. Name must be 4 or more characters.'],
    maxlength: [24, 'Item Name Invalid. Name must be 24 or less characters.'],
    required: [true, 'Item name is required.']
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


const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
