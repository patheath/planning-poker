var express = require("express");
var router = express.Router();
var start = require("../handlers/start.js");
var putItem = require("../handlers/foo.js");

var myLogger = function (req, res, next) {
  console.log(Date(Date.now()).toString());
  console.log(req.body);
  next();
};

router.use(myLogger);

/* POST Start a new session, with all emails */
router.post("/session/start", function (req, res, next) {
  // pass along to handler
  const { emails } = req.body;
  session = start(emails);
  res.send(session);
});

router.post("/session/foo", function (req, res, next) {
  putItem(req, (result) => res.send(result));
  console.log("Finished");
});

/* POST the session */
router.post("/session/:sessionId", function (req, res, next) {
  const { id } = req.params;
  res.send({
    id,
    errors: [],
  });
});

module.exports = router;
