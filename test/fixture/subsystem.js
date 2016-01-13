;(function() {
  'use strict'

  var plugable = require('zephyr');

  /**
   *  Mock subclass implementation.
   */
  function PluginSystem() {
    // store arguments for assertions
    this.args = Array.prototype.slice.call(arguments);
  }

  var proto = PluginSystem.prototype
    , sys = plugable({proto: proto, type: PluginSystem});

  /**
   *  A mock fixed method on the plugin sub system.
   */
  function getArguments() {
    /* jshint validthis:true */
    return this.args;
  }

  proto.getArguments = getArguments;

  module.exports = sys;
})();
