// routes/trackers.js
import express from 'express';
var router = express.Router();

import trackersService from '../services/trackers';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trackers',
  { 
      title: 'Tracked Items',
      trackersActive: true, 
      trackers: trackersService.findAll()
  }
);
});

export default router;
