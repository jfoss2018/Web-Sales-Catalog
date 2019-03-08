const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BidSchema = new Schema({
  name: {
    type: String,
    minlength: [4, 'Bidder Name Invalid. Name must be 4 or more characters.'],
    maxlength: [24, 'Bidder Name Invalid. Name must be 24 or less characters.'],
    required: [true, 'Bidder Name is required.']
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: [true, 'Bidder must offer an amount.']
  },
  amountNum: {
    type: Number,
    required: false
  },
  preference: {
    type: String,
    required: [true, 'Preference is required.']
  },
  bidDate: {
    type: Date,
    required: [true, 'Bid date is required.']
  },
  content: {
    type: ObjectId,
    ref: 'Content'
  },
  contentName: {
    type: String,
    required: false
  },
  viewed: {
    type: Boolean,
    required: [true, 'Viewed Boolean is required.']
  }
});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;
