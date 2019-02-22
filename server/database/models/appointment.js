const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AppointmentSchema = new Schema({
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
    type: Number,
    required: [true, 'Phone Number is required.']
  },
  preference: {
    type: String,
    required: [true, 'Preference is required.']
  },
  postedDate: {
    type: Date,
    required: [true, 'Posted date is required.']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required.']
  },
  preferredTime: {
    type: Date,
    required: [true, 'Preferred time is required.']
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
