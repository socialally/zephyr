var zephyr = require('zephyr');

function MockComponent() {}

var main = 
  zephyr({
    proto: MockComponent.prototype,
    type: MockComponent,
    field: 'plugin'
  });

main.plugin([require('./field-plugin')]);

module.exports = main;
