var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var passport = require('passport');

var routes = require('./routes/routes');
var setUpPassport = require('./setUpPassport');

var app = express();

mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

var User = mongoose.model('User');
var Discussion = mongoose.model('Discussion');
var Post = mongoose.model('Post');

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "bXedCj3acLjD7£(&@lJAIWe+++Djl^^dl!@!==))",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("server started on port: " + app.get("port"));
});
