var minimatch = require('minimatch');
var util = require('util');
var assert = require('assert');

try {
  var poplar = require('poplar');
} catch(e) {
  assert(false, 'require module `poplar` failed, please add `poplar` in your package.json');
}

var ApiBuilder = poplar.ApiBuilder;

var loadConfig = require('./loaders/config');
var loadEnvironments = require('./loaders/environments');
var loadInitializers = require('./loaders/initializers');
var loadCommons = require('./loaders/commons');
var loadMiddlewares = require('./loaders/middlewares');
var loadControllers = require('./loaders/controllers');
var loadEntities = require('./loaders/entities');

var __loaded = false;

exports.init = function(baseDir) {
  if (__loaded) return this;;

  baseDir = baseDir || process.cwd();

  loadEnvironments(baseDir);

  loadConfig(baseDir);

  loadInitializers(baseDir);

  poplar.set('commons', loadCommons(baseDir));
  poplar.set('middlewares', loadMiddlewares(baseDir));
  poplar.set('controllers', loadControllers(baseDir));
  poplar.set('entities', loadEntities(baseDir));

  __loaded = true;
  return this;
};

exports.createFromApiBuilders = function(pattern, options) {
  pattern = pattern || '*';
  var api = poplar.create(options);

  var apiBuilders = (poplar.get('controllers') || {}).__caches__ || {};

  var filenames = Object.keys(apiBuilders);

  if (filenames.length) {
    filenames.forEach(function(filename) {
      if (!minimatch(filename, pattern)) return;
      var apiBuilder = apiBuilders[filename];
      assert(
        apiBuilder instanceof ApiBuilder,
        util.format('file `%s` is not a valid ApiBuilder', filename)
      );
      api.use(apiBuilder);
    });
  }

  return api;
};
