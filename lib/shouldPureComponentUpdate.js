'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = shouldPureComponentUpdate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function shouldPureComponentUpdate(nextProps, nextState) {
  return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
}

module.exports = exports['default'];