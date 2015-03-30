/**
 *  Plugin method invoked in the scope of the class prototype.
 */
module.exports = function plugin() {

  var args;

  // hook function, invoked on construction
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

  // register the constructor hook
  this.register(hook);
}
