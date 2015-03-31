;(function() {
  'use strict'

  function plug(opts) {
    opts = opts || {};

    /**
     *  Abstract plugin class.
     */
    function Component() {}

    var main
      , proto = opts.proto || Component.prototype;

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
     *  Create an instance of the class represented by *Type* and proxy
     *  all arguments to the constructor.
     */
    function construct() {
      var args = [null].concat(Array.prototype.slice.call(arguments));
      return new (Function.prototype.bind.apply(construct.Type, args));
    }

    main = opts.main || construct;

    // class to construct
    main.Type = opts.type || Component;

    // static and instance plugin method
    main.plugin = proto.plugin = opts.plugin || plugin;

    // reference to the main function for static assignment
    proto.main = main;

    return main;
  }

  module.exports = plug;
})();
