var express = require('express');
var User = require('../models/user');
var Discussion = require('../models/discussion');
var Post = require('../models/post');
var mongoose = require('mongoose');
var passport = require('passport');

var router = express.Router();

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", function(req, res, next) {
  Discussion.find({}, function(err, discussions) {
    if (err) { return next(err); }
    res.render("index", { discussions: discussions })
  });
});

router.get("/discussion/add", function(req, res, next) {
  res.render("create");
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
    res.redirect("/");
  });
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/signup", function(req, res, next) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {
  var emailAddr = req.body.email;
  var password = req.body.password;
  var username = req.body.username;

  User.find({ email: emailAddr, displayName: username }, function(err, user) {
    if (err) { return next(err); }
    console.log(user);
    if (!user.length === 0) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }
    var user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.username
    });
    user.save(next);
  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

module.exports = router;
