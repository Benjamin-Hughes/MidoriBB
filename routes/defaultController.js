var Discussion = require('../models/discussion');

module.exports = {
  default: function(req, res, next) {
    Discussion.find({}, function(err, discussions) {
      if (err) { return next(err); }
      res.render("index", { discussions: discussions });
    });
  }
}
