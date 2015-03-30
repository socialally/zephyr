;(function() {
  'use strict'

  var EventEmitter = require('emanate')
    , pluggable = require('zephyr');

  // super class derived from another inheritance hierarchy
  function SuperClass() {
    EventEmitter.apply(this, arguments);
  }
  SuperClass.prototype = new EventEmitter();

  /**
   *  Mock subclass implementation that derives from another class and
   *  decorates the prototype with plugin methods.
   */
  function DecorateSystem() {
    if(!(this instanceof DecorateSystem)) {
      return new DecorateSystem();
    }

    SuperClass.apply(this, arguments);

    // store arguments for assertions
    this.args = Array.prototype.slice.call(arguments);
  }

  // derive from superclass
  DecorateSystem.prototype = SuperClass.prototype;

  // add plugin methods to the target prototype
  var proto = SuperClass.prototype
    , zephyr = pluggable({proto: proto, type: DecorateSystem});

  /**
   *  A mock fixed method on the plugin sub system.
   */
  function getArguments() {
    return this.args;
  }

  proto.getArguments = getArguments;

  module.exports = zephyr;
})();
