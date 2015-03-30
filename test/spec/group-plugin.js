var expect = require('chai').expect
  , zephyr = require('zephyr');

describe('Zephyr:', function() {

  it('should load plugin group', function(done) {
    zephyr.plugin([require('../fixture/group-plugin')]);
    var z = zephyr();
    expect(zephyr.getGroup).to.be.a('function');
    expect(z.dep1).to.be.a('function');
    expect(z.dep2).to.be.a('function');
    expect(z.group).to.be.a('function');
    done();
  });

});
