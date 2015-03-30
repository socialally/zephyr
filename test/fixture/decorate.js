;(function() {
  'use strict'

  var EventEmitter = require('emanate')
    , zephyr = require('zephyr');

  // super class derived from another inheritance hierarchy
  function SuperClass() {
    EventEmitter.apply(this, arguments);
  }
  SuperClass.prototype = new EventEmitter();

  // add plugin methods to the target prototype
  var proto
    , Zephyr = zephyr.Type;

  zephyr = zephyr.pluggable({proto: SuperClass.prototype});
  proto = zephyr.proto;

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

    // call plugin super class for constructor hooks
    Zephyr.apply(this, arguments);
  }

  // derive from superclass
  DecorateSystem.prototype = SuperClass.prototype;

  /**
   *  A mock fixed method on the plugin sub system.
   */
  function getArguments() {
    return this.args;
  }

  proto.getArguments = getArguments;

  // construct DecorateSystem instances from main function
  zephyr.Type = DecorateSystem;

  // alias main function on instances
  proto.zephyr = zephyr;

  module.exports = zephyr;
})();
