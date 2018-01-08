const express = require("express");
const defaultController = require("./defaultController");
var router = express.Router();

router.route("/").get(defaultController.default);


module.exports = router;