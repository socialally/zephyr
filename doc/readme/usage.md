## Usage

```javascript
var pluggable = require('zephyr')
  , system = pluggable();
system.plugin([require('plugin-file')]);
var component = system();
// do something with the plugin functionality
```
