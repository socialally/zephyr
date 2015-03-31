## Plugins

Plugins are functions invoked in the scope of a class prototype that typically decorate the prototype object (using `this`) but may also add static methods or load other plugins.

### Loading Plugins

To load plugin(s) call the `plugin` function passing an array of plugin functions:

```javascript
var plug = require('zephyr')
  , sys = plug();
sys.plugin([require('plugin-file')]);
```

It is possible to pass a configuration object at runtime to a plugin by using an object with a `plugin` function and a `conf` object:

```javascript
var plug = require('zephyr')
  , sys = plug();
var plugins = [
  {
    plugin: function(conf) {
      // do something with the runtime configuration
      // initialize the plugin
    },
    conf: {foo: 'bar'}
  }
];
sys.plugin(plugins);
```

### Creating Plugins

The most common use case for plugins is to decorate the class prototype with functions that are available on instances returned by the main function, these are referred to as *instance plugins*. Plugins may also decorate the main function these are referred to as *static plugins*.

Plugin implementations may mix functionality, for clarity the examples show the distinct styles.

#### Instance Plugins

To create an instance plugin just assign a function to `this` within the plugin function:

```javascript
module.exports = function plugin() {
  // decorate class prototype
  this.chain = function() {
    // return this to allow chaining on this function
    return this;
  }
}
```

Now load the plugin and invoke the instance method:

```javascript
var comp
  , plug = require('zephyr')
  // create the plugin system
  , sys = plug();
// load the plugin
sys.plugin([require('instance-plugin')]);
// get the instance from the main function
comp = sys();
// invoke the plugin method
comp.chain();
```

#### Static Plugins

To decorate the main function with static functions assign to `this.main`.

```javascript
module.exports = function plugin() {
  this.main.method = function() {
    // implement method functionality
  }
}
```

You can then invoke the function on the plugin system:

```javascript
var plug = require('zephyr')
  , sys = plug();
sys.plugin([require('static-plugin')]);
sys.method();
```

#### Composite Plugins

You can depend upon other plugins by calling `this.plugin` within the plugin function. This allows plugins to composite other plugins in order to resolve plugin dependencies or provide plugin groups (related plugins).

```javascript
module.exports = function plugin() {
  this.plugin([require('plugin-dependency')]);
}
```

By convention plugins are singular and plugin groups are plural.

### Systems

Pass the `proto` and `type` options to create a custom plugin system:

```javascript
var plug = require('zephyr');

// custom constructor
function PluginSystem() {}

var proto = PluginSystem.prototype
  , sys = plug({proto: proto, type: PluginSystem});
module.exports = sys;
```

### Hooks

An earlier version of the library allowed constructor hooks to be registered to allow access to instantiation (instance scope) however this functionality is better implemented in any derived plugin system and has been removed.
