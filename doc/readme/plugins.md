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

#### Configuration

Plugins accept a single argument which is a configuration object optionally passed when loading the plugin. Useful when a plugin wishes to add functionality conditionally. For example:

```javascript
module.exports = function plugin(conf) {
  conf = conf || {};
  // implement default logic
  if(conf.ext) {
    // implement extended logic
  }
}
```

Then a consumer of the plugin system could enable the extended logic:

```javascript
sys.plugin({plugin: require('conf-plugin-file'), conf: {ext: true}})
```

#### Hooks

For some plugin systems it is useful to be able to add functionality in the scope of the component instance rather than the prototype. For example to add a default listener for an event, set properties on the instance or start running logic on component creation (or based on the plugin configuration).

Pass an array as the `hooks` option:

```javascript
var plug = require('zephyr')
  , sys = plug({hooks: []});
```

And an additional `register` method is available on `plugin`:

```javascript
function hook() {
  // do something on component instantiation
}
module.exports = function plugin() {
  // register the constructor hook
  this.plugin.register(hook);
}
```

Note that hooks are only applied when the component is created with the main function:

```javascript
var plug = require('zephyr')
  , sys = plug({hooks: []});
sys.plugin([require('plugin-with-hook')]);
// constructor hooks are applied
var comp = sys();
// bypass constructor hooks, probably not desirable
comp = new sys.Type();
```

#### Systems

A plugin system is the result of invoking the `zephyr` function:

```javascript
var plug = require('zephyr')
  , sys = plug();
module.exports = sys;
```

Which allows the ability to mix multiple components using plugins in the same code base. Typically you would export the main function returned as the plugin system.

##### Extend

Pass the `proto` and `type` options to extend the plugin system:

```javascript
var plug = require('zephyr');

// custom constructor
function PluginSystem() {}

var proto = PluginSystem.prototype
// extend the prototype with base functionality
// available to all plugins
var sys = plug({proto: proto, type: PluginSystem});
module.exports = sys;
```

For an example implementation see [air.js][].
