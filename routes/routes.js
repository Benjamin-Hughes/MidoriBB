var express    = require('express');
var User       = require('../models/user');
var Discussion = require('../models/discussion');
var Post       = require('../models/post');
var mongoose   = require('mongoose');
var passport   = require('passport');

var router = express.Router();

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors      = req.flash("error");
  res.locals.infos       = req.flash("info");
  next();
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "Please log in to continue");
    res.redirect("/login");
  }
}

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
});

router.get("/discussion/:discussion_id/index", function (req, res, next) {
  Post.find({ parent: req.params.discussion_id }, function(err, posts) {
    if (err) { return next(err); }
    res.render("discussion-index", {
      discussionId: req.params.discussion_id,
      posts: posts
    });
  });
});

router.get("/discussion/:discussion_id/create_post", checkAuth, function(req, res, next) {
  res.render("create-post", { discussionId: req.params.discussion_id });
});

router.post("/discussion/:discussion_id/create_post", checkAuth, function(req, res, next) {
  newPost = new Post({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    text: req.body.content,
    creator: req.user.username,
    parent: req.params.discussion_id
  });
  newPost.save(function(err) {
    if (err) { return handleError(err); }
    res.redirect('/discussion/' + req.params.discussion_id + '/index');
  });
});

router.get("/discussion/:discussion_id/:post_id", function(req, res, next) {
  Post.findOne({_id: req.params.post_id }, function(err, post) {
    if (err) { return next(err); }
    res.render("post", { post: post });
  });
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash:    true
}));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})

router.get("/signup", function(req, res, next) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {
  var emailAddr = req.body.email;
  var password  = req.body.password;
  var username  = req.body.username;

  User.find({ email: emailAddr, displayName: username }, function(err, user) {
    if (err) { return next(err); }
    console.log(user);
    if (!user.length === 0) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }
    var user = new User({
      _id: new mongoose.Types.ObjectId(),
      email:       req.body.email,
      password:    req.body.password,
      displayName: req.body.username
    });
    user.save(next);
  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash:    true
}));

module.exports = router;
