Poplar Glue
===========

Magic glue that makes poplar compoments work together

### Loading Process

1. Load `config/environments/*.js` and creating environment specific helpers
2. Load `config/config.js` file
3. Load `config/initializers/*.js`
4. Load `middlewares/*.js` into `poplar.get('middlewares')`
4. Load `api/controllers/*.js` into `poplar.get('controllers')`
4. Load `api/entities/*.js` into `poplar.get('entities')`

### Magic method for create Poplar instance

```javascript
var glue = require('poplar-glue').init();

var apiV1 = glue.createFromApiBuilders('v1/*');
```

### LICENSE

* poplar-glue is licensed under the MIT license

### Author

[Felix Liu](https://github.com/lyfeyaj)
