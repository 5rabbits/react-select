import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'ScrollLock',

  componentDidMount() {
    this.scrollLock();
  },

  shouldComponentUpdate: shouldPureComponentUpdate,

  componentDidUpdate() {
    this.scrollLock();
  },

  componentWillUnmount() {
    this.scrollRelease();
  },

  cancelScrollEvent(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    event.returnValue = false;

    return false;
  },

  scrollLock() {
    const domNode = ReactDOM.findDOMNode(this);

    if (domNode) {
      domNode.addEventListener('wheel', this.onScrollHandler, false);
    }
  },

  scrollRelease() {
    const domNode = ReactDOM.findDOMNode(this);

    if (domNode) {
      domNode.removeEventListener('wheel', this.onScrollHandler, false);
    }
  },

  onScrollHandler(event) {
    const domNode = ReactDOM.findDOMNode(this);
    const scrollTop = domNode.scrollTop;
    const scrollHeight = domNode.scrollHeight;
    const height = domNode.clientHeight;
    const wheelDelta = event.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (scrollHeight === height) {
      return true;
    }

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      domNode.scrollTop = scrollHeight;
      return this.cancelScrollEvent(event);
    }
    else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      domNode.scrollTop = 0;
      return this.cancelScrollEvent(event);
    }
  },

  render() {
    return this.props.children;
  }
});
