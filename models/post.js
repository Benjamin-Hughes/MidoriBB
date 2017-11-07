var mongoose = require('mongoose');
var bcrypt = require ('bcrypt-nodejs');

var postSchema = mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  text: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;
