var expect = require('chai').expect
  , zephyr = require('zephyr')();

describe('Zephyr:', function() {

  it('should use subclass in decorated subsystem', function(done) {
    var system = require('../fixture/decorate');
    expect(system.Type.name).to.eql('DecorateSystem');
    var sub = system('foo', 1, false);
    expect(sub).to.be.instanceof(system.Type);
    expect(sub.getArguments()).to.eql(['foo', 1, false]);
    // event emitter method in inheritance chain
    expect(sub.on).to.be.a('function');
    done();
  });

});
