var mongoose = require('mongoose');
var bcrypt = require ('bcrypt-nodejs');

var discussionSchema = mongoose.Schema({
  title: { type: String, required: true },
  moderators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  description: { type: String, required: true }
});

var Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;
