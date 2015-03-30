var expect = require('chai').expect
  , zephyr = require('zephyr');

describe('Zephyr:', function() {

  it('should add instance method w/ conf', function(done) {
    var z = zephyr()
      , conf = {foo: 'bar'};
    z.plugin(
      [
        {plugin: require('../fixture/config-plugin'), conf: conf}
      ]
    );
    expect(z.config()).to.equal(conf);
    done();
  });

});
