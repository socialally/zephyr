var expect = require('chai').expect
  , Component = require('../fixture/field-component')
  , MockClass = require('../fixture/field-plugin');

describe('Zephyr:', function() {

  it('should load plugin from user-defined field', function(done) {
    var c = Component();
    expect(c.mock).to.be.a('function');
    expect(c.mock()).to.be.instanceof(MockClass);
    done();
  });

});
