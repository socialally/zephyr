var args;

// hook function, invoked on construction
// best to declare outside the plugin function
// so there is only a single reference
function hook() {
  // constructor arguments
  args = Array.prototype.slice.call(arguments);

  this.hooked = function hooked(cb) {
    cb();
  }

  this.getConstructorArgs = function getConstructorArgs() {
    return args;
  }
}

/**
 *  Plugin method invoked in the scope of the class prototype.
 */
module.exports = function plugin() {
  // register the constructor hook
  this.register(hook);
}
