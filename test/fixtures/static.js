/**
 *  Plugin method invoked in the scope of the class prototype.
 */
module.exports = function plugin() {
  // assign to main method, becomes a static method
  // on the module exports function
  this.main.factory = function factory() {}
}
