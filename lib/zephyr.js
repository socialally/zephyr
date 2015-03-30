;(function() {
  'use strict'

  function pluggable(opts) {
    opts = opts || {};
    var hooks = []
      , proto;

    /**
     *  Abstract plugin class.
     */
    function Zephyr() {
      // invoke constructor hooks
      for(var i = 0;i < hooks.length;i++) {
        hooks[i].apply(this, arguments);
      }
    }

    proto = opts.proto || Zephyr.prototype;

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

    // class to construct
    construct.Type = opts.type || Zephyr;

    // static and instance plugin method
    construct.plugin = proto.plugin = opts.plugin || plugin;

    // hook register method, available to plugins via *this.register()*
    proto.register = opts.register || register;

    // expose instantiation hooks, users may wish to manually modify
    proto.hooks = opts.hooks || hooks;

    // reference to the main function for static assignment
    proto.main = construct;

    // expose the prototype being decorated with plugins
    construct.proto = proto;

    // reference the main pluggable function, allow for mixed
    // decorated subsystems
    construct.pluggable = pluggable;

    return construct;
  }

  module.exports = pluggable();
})();
