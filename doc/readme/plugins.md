## Plugins

Plugins are functions invoked in the scope of a class prototype that typically decorate the prototype object (using `this`) but may also add static methods or load other plugins.

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

#### Systems

You may wish to extend the default class or extend another class and decorate a prototype object with plugin methods to provide base functionality for your custom plugin system.

##### Inheritance

To inherit directly you can extend the prototype of the `Type` class and then update `Type` to point to the subclass. For example:

```javascript
var zephyr = require('zephyr')
  // reference the super class
  , Zephyr = zephyr.Type;

// subclass constructor
function PluginSystem() {
  // allow invocation without new (recommended)
  if(!(this instanceof PluginSystem)) {
    return new PluginSystem();
  }
  // call constructor hooks (optional)
  Zephyr.apply(this, arguments);
}

// extend the prototype of the default super class
PluginSystem.prototype = Zephyr.prototype;

// update Type to point to the new constructor
zephyr.Type = PluginSystem;

// export the plugin system
module.exports = zephyr;
```

#### Composition

When your plugin class needs to extend another class then you can *decorate* the class prototype using the `plugable` function to create a plugin system. For example:

```javascript
var zephyr = require('zephyr')
  // reference the default super class for
  // optional constructor hooks
  , Zephyr = zephyr.Type;

// super class (possibly derived from another inheritance hierarchy)
function SuperClass() {}

// create a new plugin system passing the prototype to decorate
zephyr = zephyr.plugable({proto: SuperClass.prototype});

function DecorateSystem() {
  // allow invocation without new (recommended)
  if(!(this instanceof DecorateSystem)) {
    return new DecorateSystem();
  }
  SuperClass.apply(this, arguments);
  // call constructor hooks (optional)
  Zephyr.apply(this, arguments);
}

// extend the prototype of the alternative super class
DecorateSystem.prototype = SuperClass.prototype;

// update Type to point to the new constructor
zephyr.Type = DecorateSystem;

module.exports = zephyr;
```

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
