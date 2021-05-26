const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  profileInfo: {type: String, required: true},
  profilePicture: {type: File, required: false},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  interests: {type: String, required: false},
  myEvents: {type: String, required: false},
  myMedia: {type: File, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
