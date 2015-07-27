var glob = require('glob');
var assert = require('assert');

try {
  var poplar = require('poplar');
} catch(e) {
  assert(false, 'require module `poplar` failed, please add `poplar` in your package.json');
}

require('./extentions');

var loadConfig = require('./loaders/config');
var loadEnvironments = require('./loaders/environments');
var loadInitializers = require('./loaders/initializers');
var loadMiddlewares = require('./loaders/middlewares');
var loadControllers = require('./loaders/controllers');
var loadEntities = require('./loaders/entities');

exports.init = function(baseDir) {
  baseDir = baseDir || process.cwd();

  loadEnvironments(baseDir);

  loadConfig(baseDir);

  loadInitializers(baseDir);

  poplar.set('middlewares', loadMiddlewares(baseDir));
  poplar.set('controllers', loadControllers(baseDir));
  poplar.set('entities', loadEntities(baseDir));
};
