"use strict";

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _models = require("../src/models");

var _models2 = _interopRequireDefault(_models);

var _users = require("./users.json");

var _users2 = _interopRequireDefault(_users);

var _teams = require("./teams.json");

var _teams2 = _interopRequireDefault(_teams);

var _members = require("./members.json");

var _members2 = _interopRequireDefault(_members);

var _channels = require("./channels.json");

var _channels2 = _interopRequireDefault(_channels);

var _channelMembers = require("./channelMembers.json");

var _channelMembers2 = _interopRequireDefault(_channelMembers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_models2.default.sequelize.sync({ force: true }).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _bluebird2.default.all(_users2.default.map(function (user) {
            return _models2.default.User.create(user);
          }));

        case 2:
          console.log("users Populated");
          _context.next = 5;
          return _bluebird2.default.all(_teams2.default.map(function (team) {
            return _models2.default.Team.create(team);
          }));

        case 5:
          console.log("teams Populated");
          _context.next = 8;
          return _bluebird2.default.all(_members2.default.map(function (member) {
            return _models2.default.Member.create(member);
          }));

        case 8:
          console.log("members Populated");
          _context.next = 11;
          return _bluebird2.default.all(_channels2.default.map(function (channel) {
            return _models2.default.Channel.create(channel);
          }));

        case 11:
          console.log("channels Populated");
          _context.next = 14;
          return _bluebird2.default.all(_channelMembers2.default.map(function (cm) {
            return _models2.default.ChannelMember.create(cm);
          }));

        case 14:
          console.log("channelMembers Populated");
          process.on("exit", console.log("Populated database with seed successfully."));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));
