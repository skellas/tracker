"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackersService = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrackersService =
/*#__PURE__*/
function () {
  function TrackersService() {
    _classCallCheck(this, TrackersService);

    this.trackers = [];
  }

  _createClass(TrackersService, [{
    key: "findAll",
    value: function findAll() {
      if (this.trackers.length === 0) {
        this.loadTrackers();
      }

      return this.trackers;
    }
  }, {
    key: "find",
    value: function find(id) {
      console.log('looking for id: ' + id);
      return this.trackers.find(function (tracker) {
        return tracker.id == id;
      });
    }
  }, {
    key: "update",
    value: function update(id, updatedTracker) {
      this.remove(id);
      console.log(this.trackers);
      this.add(updatedTracker);
      return this.find(id);
    }
  }, {
    key: "add",
    value: function add(tracker) {
      if (!tracker.id || tracker.id === '') {
        tracker.id = this.trackers.length + 1;
      }

      console.log("adding ");
      console.log(tracker);
      this.trackers.push(tracker);
      return tracker;
    }
  }, {
    key: "remove",
    value: function remove(id) {
      console.log('removing by id: ' + id);
      this.trackers.splice([this.trackers.findIndex(function (tracker) {
        return tracker.id == id;
      })], 1);
      return id;
    }
  }, {
    key: "loadTrackers",
    value: function loadTrackers() {
      var data = _fs["default"].readFileSync(_path["default"].join(__dirname, '../../data/trackers.json')).toString();

      this.trackers = JSON.parse(data);
    }
  }]);

  return TrackersService;
}();

exports.TrackersService = TrackersService;