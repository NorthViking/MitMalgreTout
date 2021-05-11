const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  title:{type:String, require: true},
  description:{type: String, require: true},
  imagePath:{type: String, require: true}
});

module.exports = mongoose.model('Image', imageSchema);
