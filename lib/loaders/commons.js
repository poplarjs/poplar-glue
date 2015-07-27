var path = require('path');
var loader = require('../loader');

var DEFAULT_DIR = 'commons';
var DEFAULT_PATTERN = '**/*.js';

module.exports = function(baseDir, commonDir, pattern) {
  commonDir = commonDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  commonDir = path.join(baseDir, commonDir);
  return loader(commonDir, pattern);
};
