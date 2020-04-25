var express = require('express');
var router = express.Router();

var myLogger = function (req, res, next) {
  console.log(Date(Date.now()).toString());
  console.log(req.body);
  next();
}

router.use(myLogger);

/* POST the session */
router.post('/session/:sessionId', function(req, res, next) {
  const {id} = req.params
  res.send({
    id,
    errors: []
  });
});

module.exports = router;
