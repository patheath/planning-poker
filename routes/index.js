var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api', function(req, res, next) {
  res.send('<h1>API New Reloaded Express</h1>');
});
module.exports = router;
