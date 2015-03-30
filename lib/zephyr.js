;(function() {
  'use strict'

  function plugable(opts) {
    opts = opts || {};
    var proto;

    /**
     *  Abstract plugin class.
     */
    function Zephyr() {}

    proto = opts.proto || Zephyr.prototype;

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

    var main = opts.main || construct;

    // class to construct
    main.Type = opts.type || Zephyr;

    // static and instance plugin method
    main.plugin = proto.plugin = opts.plugin || plugin;

    // reference to the main function for static assignment
    proto.main = main;

    return main;
  }

  module.exports = plugable;
})();
