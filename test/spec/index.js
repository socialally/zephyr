var shim = require('es5-shim');

module.exports = {
  core: require('./core'),
  instance: require('./instance-plugin'),
  static: require('./static-plugin'),
  group: require('./group-plugin'),
  config: require('./config-plugin'),
  //hook: require('./hook-plugin'),
  //error: require('./error'),
  subsystem: require('./subsystem'),
  decorate: require('./decorate'),
}
