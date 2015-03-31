;(function() {
  'use strict'

  function plug(opts) {
    opts = opts || {};

    /**
     *  Default plugin class.
     */
    function Component(){}

    var main
      , hooks = opts.hooks
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
      return new (Function.prototype.bind.apply(main.Type, args));
    }

    /**
     *  Invoke constructor hooks by proxying to the main construct
     *  function and invoking registered hook functions in the scope
     *  of the created component.
     */
    function hook() {
      var comp = hook.proxy.apply(null, arguments);
      // apply hooks in scope of the component
      // after instantiation
      for(var i = 0;i < hooks.length;i++) {
        hooks[i].apply(comp, arguments);
      }
      return comp;
    }

    function register(fn) {
      if(typeof fn === 'function' && !~hooks.indexOf(fn)) {
        hooks.push(fn);
      }
    }

    main = opts.main || construct;

    if(hooks) {
      hook.proxy = main;
      main = hook;
    }

    // class to construct
    main.Type = opts.type || Component;

    // static and instance plugin method
    main.plugin = proto.plugin = opts.plugin || plugin;

    // constructor hook register
    if(Array.isArray(hooks)) {
      main.plugin.register = register;
    }

    // reference to the main function for static assignment
    proto.main = main;

    return main;
  }

  module.exports = plug;
})();
