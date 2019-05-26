"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trackers = require("../services/trackers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes/trackers.js
var router = _express["default"].Router();

var trackerService = new _trackers.TrackersService();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('trackers', {
    title: 'Tracked Items',
    trackersActive: true,
    trackers: trackerService.findAll()
  });
});
/* GET: find an individual tracker. */

router.get('/:id', function (req, res) {
  res.json(trackerService.find(req.params.id));
});
/* PUT: update an existing tracker. */

router.put('/:id', function (req, res) {
  res.json(trackerService.update(req.params.id, req.body));
});
/* POST: create a new tracker. */

router.post('/', function (req, res) {
  res.json(trackerService.add(req.body));
});
/* DELETE: an existing tracker. */

router["delete"]('/:id', function (req, res) {
  res.json(trackerService.remove(req.params.id));
});
var _default = router;
exports["default"] = _default;