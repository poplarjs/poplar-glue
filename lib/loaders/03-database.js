var path = require('path');
var poplar = require('poplar');

var DEFAULT_DIR = 'config';
var DEFAULT_PATTERN = 'database.json';

module.exports = function(baseDir, configDir, pattern) {
  configDir = configDir || DEFAULT_DIR;
  pattern = pattern || DEFAULT_PATTERN;
  configDir = path.join(baseDir, configDir);
  var config = poplar.get('config');
  var env = poplar.get('env');
  var databaseConfig = require(path.join(configDir, pattern));
  config.database = databaseConfig[env.NODE_ENV.toLowerCase()] || {};
  poplar.set('config', config);
  poplar.config = poplar.get('config');
};
