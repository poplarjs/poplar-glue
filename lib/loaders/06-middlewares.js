var path = require('path');
var poplar = require('poplar');
var loader = require('../loader');

var DEFAULT_DIR = 'api/middlewares';
var DEFAULT_PATTERN = '**/*.js';

module.exports = function(baseDir, middlewareDir, pattern) {
  middlewareDir = middlewareDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  middlewareDir = path.join(baseDir, middlewareDir);
  poplar.set('middlewares', loader(middlewareDir, pattern));
  poplar.middlewares = poplar.get('middlewares');
};
