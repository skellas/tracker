// routes/entries.js
import express from 'express';
var router = express.Router();

import {EntriesService} from '../services/entries';

const entriesService = new EntriesService();

/* GET: find entries for a tracker. */
router.get('/:trackerId', function(req, res) {
  return entriesService.findEntries(req.params.trackerId)
                            .then(response => res.status(200).json(response));
});

export default router;
