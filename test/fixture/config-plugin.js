/**
 *  Plugin method invoked in the scope of the class prototype
 *  and passed a runtime configuration object.
 */
module.exports = function plugin(conf) {
  // assign to class prototype
  this.config = function config() {
    return conf;
  }
}
