var expect = require('chai').expect
  , zephyr = require('zephyr')();

describe('Zephyr:', function() {

  it('should add instance method', function(done) {
    zephyr.plugin([require('../fixture/instance-plugin')]);
    var z = zephyr();
    expect(z.callback).to.be.a('function');
    z.callback(done);
  });

});
