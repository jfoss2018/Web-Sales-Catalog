const Appointment = require('../../database/models/appointment.js');
const moment = require('moment');

function setup(req, res, next) {
  const { name, email, phone, preference, preferredDate, preferredTime } = req.body;
  const newDate = preferredDate + ' ' + preferredTime;
  const momentDate = moment(newDate, 'M-DD-YYYY h:mm a');
  const newMomentDate = moment(momentDate).utc();
  const appoint = new Appointment({
    name: name,
    email: email,
    phone: phone,
    preference: preference,
    postedDate: moment.utc(),
    preferredDate: newMomentDate,
    viewed: false
  });
  appoint.save(function(err, appointment) {
    if (err) return next(err);
    res.status('201').json({appointment: appointment});
  });
}

function retrieve(req, res, next) {
  Appointment.find({}, null, {sort: {preferredDate: 1}}, function(err, appointments) {
    if (err) return next(err);
    res.status('200').json({appointments: appointments});
  });
}

function retrieveSingle(req, res, next) {
  Appointment.findById(req.params.id).exec(function(err, appointment) {
    if (err) return next(err);
    res.status('200').json({appointment: appointment});
  });
}

function edit(req, res, next) {
  Appointment.updateOne({_id: req.params.id}, req.body, {runValidators: true}, function(err, result) {
    if (err) return next(err);
    res.status('204').json({message: 'Appointment Updated!'});
  });
}

function deleteAppointment(req, res, next) {
  Appointment.deleteOne({_id: req.params.id}, function(err) {
    if (err) return next(err);
    res.status('204').json({message: 'Appointment Deleted!'});
  });
}

module.exports = { setup, retrieve, retrieveSingle, deleteAppointment, edit }
