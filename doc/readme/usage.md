## Usage

```javascript
var plug = require('zephyr')
  // create the plugin system
  , sys = plug({});
// load plugins
sys.plugin([require('plugin-file')]);
// create a component
var component = sys();
// do something with the plugin functionality
```

## Options

* `proto`: A reference to the prototype object.
* `type`: A reference to the class to instantiate.
* `main`: An alternative main function (factory).
* `plugin`: Override the default plugin function.
* `hooks`: Array of functions invoked as constructor hooks.
* `field`: String name of field for plugin function.
