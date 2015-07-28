Poplar Glue
===========

[![Build Status](https://travis-ci.org/poplarjs/poplar-glue.svg?branch=master)](https://travis-ci.org/poplarjs/poplar-glue)
[![Code Climate](https://codeclimate.com/github/poplarjs/poplar-glue/badges/gpa.svg)](https://codeclimate.com/github/poplarjs/poplar-glue)
[![npm version](https://badge.fury.io/js/poplar-glue.svg)](http://badge.fury.io/js/poplar-glue)
[![Inline docs](http://inch-ci.org/github/poplarjs/poplar-glue.svg?branch=master)](http://inch-ci.org/github/poplarjs/poplar-glue)

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

### Pre-loaded compoments

``` javascript
var controllers = poplar.get('controllers');
var entities = poplar.get('entities');
var middlewares = poplar.get('middlewares');
var commons = poplar.get('commons');
var env = poplar.get('env');
var config = poplar.get('config');
```

### LICENSE

* poplar-glue is licensed under the MIT license

### Author

[Felix Liu](https://github.com/lyfeyaj)
