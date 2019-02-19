const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    minlength: [4, 'Username Invalid. Username must be 4 or more characters.'],
    maxlength: [16, 'Username Invalid. Username must be 16 or less characters.'],
    required: [true, 'Username is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'Email is required.']
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number is required.']
  }
});

/*
// The verifyPassword method is used compare provided password with the saved
// hashed password.
UserSchema.methods.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

// The hashPassword method is used to hash new passwords when a new user is
// registered.
UserSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, 10);
}

// The pre save hook hashes any provided passwords before it is saved.
UserSchema.pre('save', function(next) {
	if (!this.password) {
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
});
*/

const User = mongoose.model('User', UserSchema);

module.exports = User;
