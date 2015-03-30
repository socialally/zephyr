/**
 *  Plugin method invoked in the scope of the class prototype.
 */
module.exports = function plugin() {
  // assign to class prototype
  this.callback = function callback(cb) {
    cb();
  }
}
