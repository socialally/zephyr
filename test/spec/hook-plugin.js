var expect = require('chai').expect
  , zephyr = require('zephyr')();

describe('Zephyr:', function() {

  it('should add constructor hook', function(done) {
    zephyr.plugin([require('../fixture/hook-plugin')]);
    var z = zephyr('foo', 1, true);
    var args = z.getConstructorArgs();
    expect(args[0]).to.eql('foo');
    expect(args[1]).to.eql(1);
    expect(args[2]).to.eql(true);
    z.hooked(done);
  });

});
