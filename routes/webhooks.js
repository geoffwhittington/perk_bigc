var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/webhooks", function (req, res, next) {
  console.log(req.body);
  // respond with 200 OK
  res.send("OK");
});

module.exports = router;
