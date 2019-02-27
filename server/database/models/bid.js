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
    validate: {
      validator: function(v) {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'Bidder Email is required.']
  },
  phone: {
    type: String,
    required: [true, 'Phone Number is required.']
  },
  amount: {
    type: String,
    required: [true, 'Bidder must offer an amount.']
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
  }
});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;
