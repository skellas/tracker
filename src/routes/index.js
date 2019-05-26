// routes/index.js
import express from 'express';
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

/* GET bootstrap4 templated page. */
router.get('/bootstrap', function(req, res, next) {
  res.render('bootstrap4', 
    {}
  );
});

export default router;
