var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trackers',
  { 
      title: 'Entry Trackers',
      trackersActive: true
  }
);
});

module.exports = router;
