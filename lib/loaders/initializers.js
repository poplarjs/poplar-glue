var path = require('path');
var loader = require('../loader');

var DEFAULT_DIR = 'config/initializers';
var DEFAULT_PATTERN = '**/*.js';

module.exports = function(baseDir, initializerDir, pattern) {
  initializerDir = initializerDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  initializerDir = path.join(baseDir, initializerDir);
  return loader(initializerDir, pattern);
};
