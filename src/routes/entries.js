// routes/entries.js
import express from 'express';
var router = express.Router();

import {EntriesService} from '../services/entries';

const entriesService = new EntriesService();

/* GET: find entries for a tracker. */
router.get('/:trackerId', function(req, res) {
  res.json(entriesService.findEntries(req.params.trackerId));
});


export default router;
