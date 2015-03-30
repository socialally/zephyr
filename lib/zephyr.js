;(function() {
  'use strict'

  var hooks = [];

  /**
   *  Abstract plugin class.
   */
  function Zephyr() {
    // invoke constructor hooks
    for(var i = 0;i < hooks.length;i++) {
      hooks[i].apply(this, arguments);
    }
  }

  var proto = Zephyr.prototype;

  /**
   *  Register a method to be invoked when the class
   *  is instantiated.
   *
   *  @param hook A function to be invoked on construction.
   */
  function register(hook) {
    if(typeof hook === 'function') {
      hooks.push(hook);
    }
  }

  /**
   *  Plugin method.
   *
   *  @param plugins Array of plugin functions.
   */
  function plugin(plugins) {
    var z;
    for(z in plugins) {
      if(typeof plugins[z] === 'function') {
        plugins[z].call(proto);
      // assume object style declaration
      }else{
        plugins[z].plugin.call(proto, plugins[z].conf);
      }
    }
  }

  /**
   *  Create an instance of the class represented by *main* and proxy
   *  all arguments to the constructor.
   */
  function construct() {
    var args = [null].concat(Array.prototype.slice.call(arguments));
    return new (Function.prototype.bind.apply(construct.Type, args));
  }

  /**
   *  Extend a prototype object with the plugin functionality.
   */
  function extend(sup) {
    sup.prototype.plugin = plugin;
    sup.prototype.register = register;
    proto = sup.prototype;
    return sup.prototype;
  }

  construct.extend = extend;

  // class to construct
  construct.Type = Zephyr;

  // static and instance plugin method
  construct.plugin = proto.plugin = plugin;

  // hook register method, available to plugins via *this.register()*
  proto.register = register;

  // expose instantiation hooks, users may wish to manually modify
  proto.hooks = hooks;

  // reference to the main function for static assignment
  proto.main = construct;

  module.exports = construct;
})();
