const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  title:{type:String, required: true},
  mediaPath:{type: String, required: true},
  description:{type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Media', mediaSchema);
