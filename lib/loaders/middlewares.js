var path = require('path');
var loader = require('../loader');

var DEFAULT_DIR = 'api/middlewares';
var DEFAULT_PATTERN = '**/*.js';

module.exports = function(baseDir, middlewareDir, pattern) {
  middlewareDir = middlewareDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  middlewareDir = path.join(baseDir, middlewareDir);
  return loader(middlewareDir, pattern);
};
