var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
        title: 'Node Project Playground',
        indexActive: true
    }
  );
});

module.exports = router;
