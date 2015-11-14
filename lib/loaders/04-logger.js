var path = require('path');
var poplar = require('poplar');
var fs = require('fs');
var debug = require('debug');

var DEFAULT_DIR = 'logs';

/**
 * logger
 */
module.exports = function(baseDir, loggerDir) {
  loggerDir = loggerDir || DEFAULT_DIR;
  loggerDir = path.join(baseDir, loggerDir);
  if (!fs.existsSync(loggerDir)) {
    fs.mkdirSync(loggerDir);
  }
  var env = poplar.get('env');
  var packageInfo = poplar.get('packageInfo');
  var ROOT_PATH = poplar.get('ROOT');

  var logger = {
    access: fs.createWriteStream(path.join(loggerDir, [env.NODE_ENV, '_access', '.log'].join('')), { flags: 'a' }),
    error: fs.createWriteStream(path.join(loggerDir, [env.NODE_ENV, '_error', '.log'].join('')), { flags: 'a' }),
    debug: function(name) {
      var debuggerName = path.relative(ROOT_PATH, __filename);
      debuggerName = debuggerName.replace('/', ':');
      debuggerName = [(packageInfo.name || ''), debuggerName].join(':');
      return debug(debuggerName);
    }
  };

  poplar.set('logger', logger);

  poplar.logger = poplar.get('logger');
};
