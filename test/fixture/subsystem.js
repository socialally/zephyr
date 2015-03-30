;(function() {
  'use strict'

  var zephyr = require('zephyr')()
    , Zephyr = zephyr.Type;

  /**
   *  Mock subclass implementation.
   */
  function PluginSystem() {
    if(!(this instanceof PluginSystem)) {
      return new PluginSystem();
    }

    // store arguments for assertions
    this.args = Array.prototype.slice.call(arguments);

    // call super class for constructor hooks
    Zephyr.apply(this, arguments);
  }

  var proto = PluginSystem.prototype = Zephyr.prototype;

  /**
   *  A mock fixed method on the plugin sub system.
   */
  function getArguments() {
    return this.args;
  }

  proto.getArguments = getArguments;

  // construct PluginSystem instances from main function
  zephyr.Type = PluginSystem;

  module.exports = zephyr;
})();
