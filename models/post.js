var mongoose = require('mongoose');
var bcrypt   = require ('bcrypt-nodejs');

var postSchema = mongoose.Schema({
  _id:     { type: mongoose.Schema.Types.ObjectId },
  title:   { type: String, required: true },
  text:    { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parent:  { type: mongoose.Schema.Types.ObjectId, ref: "Discussion"}
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;
