var expect = require('chai').expect
  , zephyr = require('zephyr');

describe('Zephyr:', function() {

  it('should have methods', function(done) {
    expect(zephyr.Type).to.be.a('function');
    expect(zephyr.plugin).to.be.a('function');
    var z = zephyr();
    expect(z.plugin).to.be.a('function');
    expect(z.register).to.be.a('function');
    done();
  });

  it('should ignore bad hook type', function(done) {
    zephyr.plugin([require('../fixture/bad-hook')]);
    done();
  });

  it('should add static plugin method', function(done) {
    zephyr.plugin([require('../fixture/static-plugin')]);
    expect(zephyr.factory).to.be.a('function');
    done();
  });

  it('should load plugin group', function(done) {
    zephyr.plugin([require('../fixture/group-plugin')]);
    var z = zephyr();
    expect(zephyr.getGroup).to.be.a('function');
    expect(z.dep1).to.be.a('function');
    expect(z.dep2).to.be.a('function');
    expect(z.group).to.be.a('function');
    done();
  });

  it('should add prototype method', function(done) {
    zephyr.plugin([require('../fixture/instance-plugin')]);
    var z = zephyr();
    z.callback(done);
  });

  it('should add prototype method w/ conf', function(done) {
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

  it('should add constructor hook', function(done) {
    zephyr.plugin([require('../fixture/hook-plugin')]);
    var z = zephyr('foo', 1, true);
    var args = z.getConstructorArgs();
    expect(args[0]).to.eql('foo');
    expect(args[1]).to.eql(1);
    expect(args[2]).to.eql(true);
    z.hooked(done);
  });

  it('should use subclass in derived system', function(done) {
    var system = require('../fixture/subsystem');
    expect(system.Type.name).to.eql('PluginSystem');
    var sub = system('foo', 1, false);
    expect(sub).to.be.instanceof(system.Type);
    expect(sub.getArguments()).to.eql(['foo', 1, false]);
    done();
  });

});
