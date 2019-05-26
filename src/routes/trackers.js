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

/* GET: find an individual tracker. */
router.get('/:id', function(req, res) {
  res.json(trackerService.find(req.params.id));
});

/* PUT: update an existing tracker. */
router.put('/:id', function(req, res) {
  res.json(trackerService.update(req.params.id, req.body));
});

/* POST: create a new tracker. */
router.post('/', function(req, res) {
  res.json(trackerService.add(req.body));
});

/* DELETE: an existing tracker. */
router.delete('/:id', function(req, res) {
  res.json(trackerService.remove(req.params.id));
});

export default router;
