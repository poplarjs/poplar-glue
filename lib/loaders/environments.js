var glob = require('glob');
var path = require('path');
var loader = require('../loader');
var helpers = require('../helpers');
var poplar = require('poplar');

var DEFAULT_ENV = 'development';
var DEFAULT_DIR = 'config/environments';
var DEFAULT_PATTERN = '**/*.js';

module.exports = function(baseDir, environmentDir, pattern) {
  process.env.NODE_ENV = process.env.NODE_ENV || DEFAULT_ENV;
  var env = {
    NODE_ENV: process.env.NODE_ENV
  };

  environmentDir = environmentDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  environmentDir = path.join(baseDir, environmentDir);

  // load environment.js config according to NODE_ENV
  poplar.set('config', require(path.join(environmentDir, env.NODE_ENV + '.js')));

  // add environment helper functions, such as: `isDevelopment()`
  var files = glob.sync(path.join(environmentDir, pattern));
  files.forEach(function(file) {
    var basename = helpers.basename(file)
    var envName = 'is_' + basename;
    envName = helpers.camelize(envName);
    env[envName] = function() {
      return basename === env.NODE_ENV;
    };
  });

  poplar.set('env', env);
};
