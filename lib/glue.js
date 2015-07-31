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

// indicator for whether all loaders have been loaded, make sure they only will be loaded once
var __loaded = false;

/**
 * Glue
 * @class
 */
function Glue() {
  EventEmitter.call(this);

  this.setMaxListeners(16);

  this._registeredEvents = [];

  this._autoloadPaths = {};
}

inherits(Glue, EventEmitter);

Glue.prototype.init = function(baseDir, options) {
  var self = this;

  var emitEvent = function(name) {
    self.emit(util.format('afterload.%s', name), name, poplar.get(name));
  };

  if (__loaded) {
    (self._registeredEvents || []).forEach(function(event) {
      emitEvent(event);
    });
    return;
  };

  baseDir = baseDir || process.cwd();

  var loaders = loader(path.join(__dirname, './loaders'), '*.js');

  // default loaders
  Object.keys(loaders).forEach(function(name) {
    if (typeof loaders[name] === 'function') {
      var event = name.toLowerCase().replace(/\d+/, '');
      loaders[name].call(loaders, baseDir);
      emitEvent(event);
    }
  });

  // custom autoload paths
  Object.keys(self._autoloadPaths).forEach(function(name) {
    var autoloader = self._autoloadPaths[name];
    poplar.set(name, loader(path.resolve(autoloader.path), autoloader.pattern));
    emitEvent(name);
  });

  __loaded = true;
  return this;
};

// afterLoad hook
// `glue.afterLoad('controllers', function() {})`
Glue.prototype.afterLoad = function(name, fn) {
  this._registeredEvents.push(name);
  this.on(util.format('afterload.%s', name), fn);
};

// @param {String} name
// @param {String} path
// @param {String} pattern default **/*.js
Glue.prototype.autoload = function(name, path, pattern) {
  assert(!__loaded, '`glue.autoload()` must be called before glue.init()');
  pattern = pattern || '**/*.js';
  assert(name, 'name is not valid');
  assert(path, 'name is not valid');
  this._autoloadPaths[name] = {
    path: path,
    pattern: pattern
  };
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
