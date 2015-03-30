var expect = require('chai').expect
  , pluggable = require('zephyr');

describe('Zephyr:', function() {

  it('should have methods', function(done) {
    var zephyr = pluggable();
    expect(zephyr.Type).to.be.a('function');
    expect(zephyr.plugin).to.be.a('function');
    var z = zephyr();
    expect(z.plugin).to.be.a('function');
    expect(z.register).to.be.a('function');
    done();
  });

});
