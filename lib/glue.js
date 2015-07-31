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

  Object.keys(loaders).forEach(function(name) {
    if (typeof loaders[name] === 'function') {
      var event = name.toLowerCase().replace(/\d+/, '');
      loaders[name].call(loaders, baseDir);
      emitEvent(event);
    }
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
