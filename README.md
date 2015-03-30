Table of Contents
=================

* [Zephyr](#zephyr)
  * [Install](#install)
  * [Plugin Handbook](#plugin-handbook)
    * [Creating Plugins](#creating-plugins)
      * [Static Plugins](#static-plugins)
      * [Instance Plugins](#instance-plugins)
      * [Composite Plugins](#composite-plugins)
    * [Loading Plugins](#loading-plugins)
  * [Source](#source)
  * [Developer](#developer)
    * [Test](#test)
    * [Start](#start)
    * [Cover](#cover)
    * [Lint](#lint)
    * [Clean](#clean)
    * [Spec](#spec)
    * [Instrument](#instrument)
    * [Readme](#readme)
  * [License](#license)

Zephyr
======

Plugin class for composable libraries.

## Install

```
npm i zephyr --save
```

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

## Source

```javascript
;(function() {
  'use strict'

  function pluggable(opts) {
    opts = opts || {};
    var proto;

    /**
     *  Abstract plugin class.
     */
    function Zephyr() {
      // invoke constructor hooks
      for(var i = 0;i < this.hooks.length;i++) {
        this.hooks[i].apply(this, arguments);
      }
    }

    proto = opts.proto || Zephyr.prototype;
    proto.hooks = [];

    /**
     *  Register a method to be invoked when the class
     *  is instantiated.
     *
     *  @param hook A function to be invoked on construction.
     */
    function register(hook) {
      if(typeof hook === 'function' && !~proto.hooks.indexOf(hook)) {
        proto.hooks.push(hook);
      }
    }

    /**
     *  Plugin method.
     *
     *  @param plugins Array of plugin functions.
     */
    function plugin(plugins) {
      var z;
      for(z in plugins) {
        if(typeof plugins[z] === 'function') {
          plugins[z].call(proto);
        // assume object style declaration
        }else{
          plugins[z].plugin.call(proto, plugins[z].conf);
        }
      }
    }

    /**
     *  Create an instance of the class represented by *main* and proxy
     *  all arguments to the constructor.
     */
    function construct() {
      var args = [null].concat(Array.prototype.slice.call(arguments));
      return new (Function.prototype.bind.apply(construct.Type, args));
    }

    // class to construct
    construct.Type = opts.type || Zephyr;

    // static and instance plugin method
    construct.plugin = proto.plugin = opts.plugin || plugin;

    // hook register method, available to plugins via *this.register()*
    proto.register = opts.register || register;

    // reference to the main function for static assignment
    proto.main = construct;

    // expose the prototype being decorated with plugins
    construct.proto = proto;

    // reference the main pluggable function, allow for mixed
    // decorated subsystems
    construct.pluggable = pluggable;

    return construct;
  }

  module.exports = pluggable();
})();
```

## Developer

Developer workflow is via [gulp](http://gulpjs.com) but should be executed as `npm` scripts to enable shell execution where necessary.

### Test

Run the headless test suite using [phantomjs](http://phantomjs.org):

```
npm test
```

To run the tests in a browser context open [test/index.html](https://github.com/socialally/zephyr/blob/master/test/index.html) or use the server `npm start`.

### Start

Serve the test files from a web server with:

```
npm start
```

### Cover

Run the test suite and generate code coverage:

```
npm run cover
```

### Lint

Run the source tree through [eslint](http://eslint.org):

```
npm run lint
```

### Clean

Remove generated files:

```
npm run clean
```

### Spec

Compile the test specifications:

```
npm run spec
```

### Instrument

Generate instrumented code from `lib` in `instrument`:

```
npm run instrument
```

### Readme

Generate the project readme file (requires [mdp](https://github.com/freeformsystems/mdp)):

```
npm run readme
```

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](https://github.com/socialally/zephyr/blob/master/LICENSE) if you feel inclined.

Generated by [mdp(1)](https://github.com/freeformsystems/mdp).

[node]: http://nodejs.org
[npm]: http://www.npmjs.org
[gulp]: http://gulpjs.com
[phantomjs]: http://phantomjs.org
[browserify]: http://browserify.org
[eslint]: http://eslint.org
[sa-test]: https://github.com/socialally/sa-test
[mdp]: https://github.com/freeformsystems/mdp
[air]: https://github.com/socialally/air
