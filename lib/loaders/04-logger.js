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
  var packageName = poplar.get('packageInfo').name || '';
  var ROOT_PATH = poplar.get('ROOT');

  var logger = {
    access: fs.createWriteStream(path.join(loggerDir, [env.NODE_ENV, '_access', '.log'].join('')), { flags: 'a' }),
    error: fs.createWriteStream(path.join(loggerDir, [env.NODE_ENV, '_error', '.log'].join('')), { flags: 'a' }),
    debug: function(name) {
      try {
        // node caller => (exports, require, module, __filename, __dirname)
        // NOTES: function.caller can't be used in strict mode
        name = name || (logger.debug.caller && logger.debug.caller.arguments[3]);
      } catch (e) {
        // do nothing
      }
      name = name || '.';

      if (fs.existsSync(name)) {
        name = path.relative(ROOT_PATH, path.resolve(name));
        var extname = path.extname(name);
        name = extname ? name.replace(extname, '') : name;
        name = name.replace(/\//g, ':');
        name = name ? [packageName, name].join(':') : packageName;
      }
      return debug(name);
    }
  };

  poplar.set('logger', logger);

  poplar.logger = poplar.get('logger');
};
