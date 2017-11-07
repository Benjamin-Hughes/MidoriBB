var express = require('express');
var User = require('../models/user');
var Discussion = require('../models/discussion');

var router = express.Router();

router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", function(req, res, next) {
  Discussion.find()
  .exec(function(err, discussions) {
    if (err) { return next(err); }
    res.render('index', { discussions: discussions });
  });
});

module.exports = router;
