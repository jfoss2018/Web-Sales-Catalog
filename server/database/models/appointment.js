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
    required: false
  },
  phone: {
    type: String,
    required: false
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
  viewed: {
    type: Boolean,
    required: [true, 'Viewed Boolean is required.']
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
