var glob = require('glob');
var path = require('path');
var fs = require('fs');
var helpers = require('./helpers');

/**
 * Analyze `baseDir` and output files tree according to `pattern`
 */
module.exports = function loader(baseDir, pattern) {
  var result = {};
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
      var relativeDirs = path.dirname(relativeFilePath).split('/') || [];
      result = recursiveAssign(result, relativeDirs, file);
    });
  }

  return result;
};
