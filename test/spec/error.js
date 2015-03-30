var expect = require('chai').expect
  , zephyr = require('zephyr');

describe('Zephyr:', function() {

  it('should ignore bad hook type', function(done) {
    zephyr.plugin([require('../fixture/bad-hook')]);
    done();
  });

});
