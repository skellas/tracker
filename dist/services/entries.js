"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntriesService = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntriesService =
/*#__PURE__*/
function () {
  function EntriesService() {
    _classCallCheck(this, EntriesService);

    this.entries = new Map();
  }

  _createClass(EntriesService, [{
    key: "findEntries",
    value: function findEntries(trackerId) {
      if (!this.entries.has(trackerId)) {
        this.loadEntries(trackerId);
      }

      console.log(this.entries);
      return this.entries.get(trackerId);
    }
  }, {
    key: "loadEntries",
    value: function loadEntries(trackerId) {
      var data = _fs["default"].readFileSync(_path["default"].join(__dirname, "../../data/entries-".concat(trackerId, ".json"))).toString();

      this.entries.set(trackerId, JSON.parse(data));
    }
  }]);

  return EntriesService;
}();

exports.EntriesService = EntriesService;