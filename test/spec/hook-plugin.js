var expect = require('chai').expect
  , sys = require('zephyr')({hooks: []});

describe('Zephyr:', function() {

  it('should load hook group', function(done) {

    // NOTE: load twice to trigger a code path
    sys.plugin([
      require('../fixture/hook-plugin'),
      require('../fixture/hook-plugin')
    ]);

    var comp = sys('foo', 16, false);
    expect(comp.hooked).to.be.a('function');
    expect(comp.getConstructorArgs).to.be.a('function');
    var args = comp.getConstructorArgs();
    expect(args[0]).to.eql('foo');
    expect(args[1]).to.eql(16);
    expect(args[2]).to.eql(false);
    comp.hooked(done);
  });

});
