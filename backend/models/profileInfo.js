const mongoose = require('mongoose');



const ProfileInfo = mongoose.Schema({
  profileInfo: {type: String, required: true},
  profilePicture: {type: File, required: false},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  interests: {type: String, required: false},
  myEvents: {type: String, required: false},
  myMedia: {type: File, required: false},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});



module.exports = mongoose.model('ProfileInfo', ProfileInfo);
