var minimatch = require('minimatch');
var util = require('util');
var assert = require('assert');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

try {
  var poplar = require('poplar');
} catch(e) {
  assert(false, 'require module `poplar` failed, please add `poplar` in your package.json');
}

var loader = require('./loader');

var ApiBuilder = poplar.ApiBuilder;

var __loaded = false;

function Glue() {
  EventEmitter.call(this);

  this.setMaxListeners(16);
}

inherits(Glue, EventEmitter);

Glue.prototype.init = function(baseDir, options) {
  if (__loaded) return this;;

  baseDir = baseDir || process.cwd();

  var loaders = loader(path.join(__dirname, './loaders'), '*.js');

  Object.keys(loaders).forEach(function(name) {
    if (typeof loaders[name] === 'function') {
      // TODO: hook beforeLoad here
      loaders[name].call(loaders, baseDir);
      // TODO: hook afterLoad here
    }
  });

  __loaded = true;
  return this;
};

// TODO: before hook
// `glue.beforeLoad('controllers', function() {})`
Glue.prototype.beforeLoad = function(name, fn) {
};

// TODO: afterLoad hook
// `glue.afterLoad('controllers', function() {})`
Glue.prototype.afterLoad = function(name, fn) {
};

Glue.prototype.createFromApiBuilders = function(pattern, options) {
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

module.exports = new Glue();
