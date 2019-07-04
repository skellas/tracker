// routes/trackers.js
import express from 'express';
var router = express.Router();

import {TrackersService} from '../services/trackers';

const trackerService = new TrackersService();

/* GET home page. */
router.get('/', function(req, res, next) {
  trackerService.findAll().then(trackerResults => {
    return  res.render('trackers',
      { 
          title: 'Tracked Items',
          trackersActive: true, 
          trackers: trackerResults
      }
    );
  });
});

/* GET: find an individual tracker. */
router.get('/:id', function(req, res) {
  return trackerService.find(req.params.id)
                .then(result => res.status(200).json(result));
});

/* PUT: update an existing tracker. */
router.put('/:id', function(req, res) {
  return  trackerService.update(req.params.id, req.body)
                .then(response => res.status(200).json(response));
});

/* POST: create a new tracker. */
router.post('/', function(req, res) {
  return trackerService.add(req.body)
                .then(response => res.status(200).json(response));
});

/* DELETE: an existing tracker. */
router.delete('/:id', function(req, res) {
  return  trackerService.remove(req.params.id)
                .then(response => res.status(200).json(response));
});

export default router;
