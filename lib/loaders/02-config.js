var path = require('path');
var poplar = require('poplar');

var DEFAULT_DIR = 'config';
var DEFAULT_PATTERN = 'config.js';

module.exports = function(baseDir, configDir, pattern) {
  configDir = configDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  configDir = path.join(baseDir, configDir);
  poplar.set('config', require(path.join(configDir, pattern)), 'extend');
  poplar.config = poplar.get('config');
};
