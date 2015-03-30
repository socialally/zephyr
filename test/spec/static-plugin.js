var expect = require('chai').expect
  , zephyr = require('zephyr');

describe('Zephyr:', function() {

  it('should add static plugin method', function(done) {
    zephyr.plugin([require('../fixture/static-plugin')]);
    expect(zephyr.factory).to.be.a('function');
    done();
  });

});
