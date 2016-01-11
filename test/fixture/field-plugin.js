function MockClass() {}

MockClass.plugin = function() {
  this.mock = function mock() {
    return new MockClass();
  }
}

// sometimes we don't want to export the plugin function
module.exports = MockClass;
