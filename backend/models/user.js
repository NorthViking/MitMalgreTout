const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  lastLogin:{type: Date, require: true},
  onCreate:{type: Date, require: true}

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
