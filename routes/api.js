var express = require("express");
var router = express.Router();
var start = require("../controllers/start.js");
var getSessionsByEmail = require("../controllers/sessions.js");

var myLogger = function (req, res, next) {
  console.log(Date(Date.now()).toString());
  console.log("Payload:");
  console.log(req.body);
  next();
};

router.use(myLogger);

// POST Start a new session, with all emails
router.post("/session/start", async (req, res, next) => {
  const { emails } = req.body;
  const { sessionId, errors } = await start(emails);

  if (errors.length > 0) {
    console.log(errors);
    res.status(500).send(errors);
  } else {
    res.send(sessionId);
  }
});

// GET all active sessions filtered by email
router.get("/sessions/:email", async (req, res, next) => {
  const { email } = req.params;
  const { sessions, error } = await getSessionsByEmail(email);

  if (error) {
    res.status(500).json(error);
  } else {
    res.json(sessions);
  }
});

module.exports = router;
