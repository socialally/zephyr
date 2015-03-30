function dep1() {
  this.dep1 = function(){};
}

function dep2() {
  this.dep2 = function(){};
}

module.exports = function plugin() {
  this.plugin([dep1, dep2]);
}
