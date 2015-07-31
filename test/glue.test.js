var chai = require('chai');
var util = require('util');
var path = require('path');
var poplar = require('poplar');
var ApiBuilder = poplar.ApiBuilder;
var glue = require('../');

glue.autoload('myLoaders', path.join(__dirname, './loaders'));

var SampleApp = require('./sample_app');

var expect = chai.expect;

describe('glue', function() {
  it('should have specific functions', function() {
    expect(glue).to.respondTo('init');
    expect(glue).to.respondTo('createFromApiBuilders');
  });

  it('should load autoload paths', function() {
    expect(poplar.get('myLoaders')).to.have.property('middlewares');
    expect(poplar.get('myLoaders')).to.have.property('config');
    expect(poplar.get('myLoaders')).to.have.property('controllers');
    expect(poplar.get('myLoaders')).to.have.property('entities');
    expect(poplar.get('myLoaders')).to.have.property('environments');
    expect(poplar.get('myLoaders')).to.have.property('initializers');
  });

  it('shoule be poplar instances', function() {
    expect(SampleApp.apiV1).to.be.instanceOf(poplar);
  });

  it('shoule be ApiBuilder instances', function() {
    expect(SampleApp.apiV1._apiBuilders['users']).to.be.instanceOf(ApiBuilder);
    expect(SampleApp.apiV1._apiBuilders['roles']).to.be.instanceOf(ApiBuilder);
  });
});
