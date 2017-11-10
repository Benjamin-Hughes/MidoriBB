var express = require('express');
var User = require('../models/user');
var Discussion = require('../models/discussion');
var Post = require('../models/post');
var mongoose = require('mongoose');

var router = express.Router();

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", function(req, res, next) {
  // Discussion.find()
  // .exec(function(err, discussions) {
  //   if (err) { return next(err); }
  //   res.render('index', { discussions: discussions });
  // });
  Discussion.find({}, function(err, discussions) {
    if (err) { return next(err); }
    res.render('index', { discussions: discussions })
  });
});

router.get("/discussion/add", function(req, res, next) {
  res.render('create');
});

router.post("/discussion/add", function(req, res, next) {
  console.log(req.body);
  var discussion = new Discussion({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    moderators: null,
    posts: null,
    description: req.body.description
  });
  discussion.save(function(err) {
    if (err) { return handleError(err); }
    res.redirect('/');
  });
});


module.exports = router;
