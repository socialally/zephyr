## Plugin Handbook

This section provides information on writing and loading plugins.

Plugins are functions invoked in the scope of the class prototype that typically decorate the prototype object (using `this`) but may also add static methods or load other plugins.

### Creating Plugins

Creating plugins is designed to be simple and easy to use.

#### Static Plugins

To decorate the main function with static functions assign to `this.main`.

```javascript
module.exports = function plugin() {
  // decorate module exports
  this.main.method = function() {
    // implement method functionality
  }
}
```

You can then invoke the `method` function on the module exports:

```javascript
var zephyr = require('zephyr');
zephyr.plugin([require('static-plugin')]);
zephyr.method();
```

#### Instance Plugins

To create an instance plugin just assign a function to `this` within the plugin function:

```javascript
module.exports = function() {
  // decorate class prototype
  this.method = function() {
    // implement method functionality

    // return this to allow chaining on this function
    return this;
  }
}
```

#### Composite Plugins

You can depend upon other plugins by calling `this.plugin` within the plugin function. This allows plugins to composite other plugins in order to resolve plugin dependencies or provide plugin groups (related plugins).

```javascript
module.exports = function() {
  this.plugin(
    [
      require('plugin-dependency')
    ]
  );
}
```

By convention plugins are singular and plugin groups are plural.

### Loading Plugins

To load plugin(s) call the `plugin` function passing an array of plugin functions:

```javascript
var zephyr = require('zephyr');
zephyr.plugin([require('static-plugin')]);
```

It is possible to pass a configuration object at runtime to a plugin by using an object with a `plugin` function and a `conf` object:

```javascript
var zephyr = require('zephyr');
var plugins = [
  {
    plugin: function(conf) {
      // do something with the runtime configuration
      // initialize the plugin
    },
    conf: {foo: 'bar'}
  }
];
zephyr.plugin(plugins);
```
