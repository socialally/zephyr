## Usage

```javascript
var plug = require('zephyr')
  // create the plugin system
  , sys = plug();
// load plugins
sys.plugin([require('plugin-file')]);
// create a component
var component = sys();
// do something with the plugin functionality
```
