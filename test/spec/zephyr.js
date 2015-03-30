var expect = require('chai').expect
  , zephyr = require('zephyr');

describe('Zephyr:', function() {

  it('should have instance methods', function(done) {
    expect(zephyr.plugin).to.be.a('function');
    var z = zephyr();
    expect(z.plugin).to.be.a('function');
    expect(z.register).to.be.a('function');
    done();
  });

  it('should ignore bad hook type', function(done) {
    zephyr.plugin([require('../fixtures/bad-hook')]);
    done();
  });

  it('should add prototype method', function(done) {
    zephyr.plugin([require('../fixtures/prototype')]);
    var z = zephyr();
    z.callback(done);
  });

  it('should add prototype method w/ conf', function(done) {
    var z = zephyr()
      , conf = {foo: 'bar'};
    z.plugin(
      [
        {plugin: require('../fixtures/config'), conf: conf}
      ]
    );
    expect(z.config()).to.equal(conf);
    done();
  });

  it('should add constructor hook', function(done) {
    zephyr.plugin([require('../fixtures/hook')]);
    var z = zephyr('foo', 1, true);
    var args = z.getConstructorArgs();
    expect(args[0]).to.eql('foo');
    expect(args[1]).to.eql(1);
    expect(args[2]).to.eql(true);
    z.hooked(done);
  });

});
