var glob = require('glob');
var path = require('path');
var fs = require('fs');
var helpers = require('./helpers');

/**
 * Analyze `baseDir` and output files tree according to `pattern`
 */
module.exports = function loader(baseDir, pattern) {
  var result = {};
  var __caches__ = {};

  if (!baseDir || !pattern) return result;
  baseDir = path.resolve(baseDir);

  function recursiveAssign(targetObj, dirs, file) {
    var dir = dirs.shift();
    if (dir) {
      targetObj[dir] = targetObj[dir] || {};
      targetObj[dir] = recursiveAssign(targetObj[dir], dirs, file);
    } else {
      var moduleName = helpers.basename(file);
      moduleName = helpers.camelize(moduleName);
      moduleName = helpers.capitalize(moduleName);
      targetObj[moduleName] = require(file);
    }
    return targetObj;
  }

  if (fs.lstatSync(baseDir).isDirectory()) {
    var files = glob.sync(path.join(baseDir, pattern));
    files.forEach(function(file) {
      var relativeFilePath = path.relative(baseDir, file);
      __caches__[relativeFilePath] = require(file);
      var relativeDirs = path.dirname(relativeFilePath).split('/') || [];
      result = recursiveAssign(result, relativeDirs, file);
    });
  }

  result.__caches__ = __caches__;

  return result;
};
