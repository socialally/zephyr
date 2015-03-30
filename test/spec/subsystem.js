var expect = require('chai').expect
  , zephyr = require('zephyr')();

describe('Zephyr:', function() {

  it('should use subclass in derived system', function(done) {
    var system = require('../fixture/subsystem');
    expect(system.Type.name).to.eql('PluginSystem');
    var sub = system('foo', 1, false);
    expect(sub).to.be.instanceof(system.Type);
    expect(sub.getArguments()).to.eql(['foo', 1, false]);
    done();
  });

});
