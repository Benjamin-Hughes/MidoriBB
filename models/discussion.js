var mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:       { type: String, required: true },
  moderators:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts:       [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  description: { type: String, required: true }
});

var Discussion = mongoose.model("Discussion", discussionSchema);
module.exports = Discussion;
