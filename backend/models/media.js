const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  title:{type:String, require: true},
  mediaPath:{type: String, require: true},
  description:{type: String, require: true}
});

module.exports = mongoose.model('Media', mediaSchema);
