function dep1() {
  this.dep1 = function(){};
}

function dep2() {
  this.dep2 = function(){};
}

module.exports = function plugin() {

  // define a static level method
  this.main.getGroup = function(){};

  // load dependent plugins
  this.plugin([dep1, dep2]);

  // define additional methods
  this.group = function(){}
}
