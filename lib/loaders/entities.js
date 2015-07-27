var path = require('path');
var loader = require('../loader');

var DEFAULT_DIR = 'api/entities';
var DEFAULT_PATTERN = '**/*_entity.js';

module.exports = function(baseDir, entityDir, pattern) {
  entityDir = entityDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  entityDir = path.join(baseDir, entityDir);
  return loader(entityDir, pattern);
};
