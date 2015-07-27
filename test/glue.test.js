var chai = require('chai');
var util = require('util');
var path = require('path');
var poplar = require('poplar');
var ApiBuilder = poplar.ApiBuilder;
var glue = require('../');

var SampleApp = require('./sample_app');

var expect = chai.expect;

describe('glue', function() {
  it('should have specific functions', function() {
    expect(glue).to.respondTo('init');
    expect(glue).to.respondTo('createFromApiBuilders');
  });

  it('shoule be poplar instances', function() {
    expect(SampleApp.apiV1).to.be.instanceOf(poplar);
  });

  it('shoule be ApiBuilder instances', function() {
    expect(SampleApp.apiV1._apiBuilders['users']).to.be.instanceOf(ApiBuilder);
    expect(SampleApp.apiV1._apiBuilders['roles']).to.be.instanceOf(ApiBuilder);
  });
});
