// routes/trackers.js
import express from 'express';
var router = express.Router();

import {TrackersService} from '../services/trackers';

const trackerService = new TrackersService();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trackers',
    { 
        title: 'Tracked Items',
        trackersActive: true, 
        trackers: trackerService.findAll()
    }
  );
});

/* GET individual tracker. */
router.get('/:id', function(req, res) {
  res.json(trackerService.find(req.params.id));
});

export default router;
