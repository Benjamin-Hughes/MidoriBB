var Discussion = require('../models/discussion');
var mongoose = require('mongoose');

module.exports = {
  addDiscussionPost: function(req, res, next) {
    var discussion = new Discussion({
      _id:         new mongoose.Types.ObjectId(),
      title:       req.body.title,
      moderators:  null,
      posts:       null,
      description: req.body.description
    });

    discussion.save(function(err) {
      if (err) { return handleError(err); }
      res.redirect("/");
    });
  },
  addDiscussionGet: function(req, res, next) {
    res.render("create");
  }
}
