"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _entries = require("../services/entries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes/entries.js
var router = _express["default"].Router();

var entriesService = new _entries.EntriesService();
/* GET: find entries for a tracker. */

router.get('/:trackerId', function (req, res) {
  res.json(entriesService.findEntries(req.params.trackerId));
});
var _default = router;
exports["default"] = _default;