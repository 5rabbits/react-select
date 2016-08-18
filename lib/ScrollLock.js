'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shouldPureComponentUpdate = require('./shouldPureComponentUpdate');

var _shouldPureComponentUpdate2 = _interopRequireDefault(_shouldPureComponentUpdate);

exports['default'] = _react2['default'].createClass({
  displayName: 'ScrollLock',

  componentDidMount: function componentDidMount() {
    this.scrollLock();
  },

  shouldComponentUpdate: _shouldPureComponentUpdate2['default'],

  componentDidUpdate: function componentDidUpdate() {
    this.scrollLock();
  },

  componentWillUnmount: function componentWillUnmount() {
    this.scrollRelease();
  },

  cancelScrollEvent: function cancelScrollEvent(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    event.returnValue = false;

    return false;
  },

  scrollLock: function scrollLock() {
    var domNode = _reactDom2['default'].findDOMNode(this);

    if (domNode) {
      domNode.addEventListener('wheel', this.onScrollHandler, false);
    }
  },

  scrollRelease: function scrollRelease() {
    var domNode = _reactDom2['default'].findDOMNode(this);

    if (domNode) {
      domNode.removeEventListener('wheel', this.onScrollHandler, false);
    }
  },

  onScrollHandler: function onScrollHandler(event) {
    var domNode = _reactDom2['default'].findDOMNode(this);
    var scrollTop = domNode.scrollTop;
    var scrollHeight = domNode.scrollHeight;
    var height = domNode.clientHeight;
    var wheelDelta = event.deltaY;
    var isDeltaPositive = wheelDelta > 0;

    if (scrollHeight === height) {
      return true;
    }

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      domNode.scrollTop = scrollHeight;
      return this.cancelScrollEvent(event);
    } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      domNode.scrollTop = 0;
      return this.cancelScrollEvent(event);
    }
  },

  render: function render() {
    return this.props.children;
  }
});
module.exports = exports['default'];