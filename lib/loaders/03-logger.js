var path = require('path');
var poplar = require('poplar');
var fs = require('fs');

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

  poplar.set('logger', {
    access: fs.createWriteStream(path.join(loggerDir, [env.NODE_ENV, '_access', '.log'].join('')), { flags: 'a' }),
    error: fs.createWriteStream(path.join(loggerDir, [env.NODE_ENV, '_error', '.log'].join('')), { flags: 'a' }),
  });
  poplar.logger = poplar.get('logger');
};
