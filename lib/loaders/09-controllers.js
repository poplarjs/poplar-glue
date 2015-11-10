var path = require('path');
var poplar = require('poplar');
var loader = require('../loader');

var DEFAULT_DIR = 'api/controllers';
var DEFAULT_PATTERN = '**/*_api.js';

module.exports = function(baseDir, controllerDir, pattern) {
  controllerDir = controllerDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  controllerDir = path.join(baseDir, controllerDir);
  poplar.set('controllers', loader(controllerDir, pattern));
  poplar.controllers = poplar.get('controllers');
};
