var chai = require('chai');
var util = require('util');
var path = require('path');
var loader = require('../lib/loader');

var expect = chai.expect;

describe('loader', function() {
  it('should have all files in target dir as tree structure and required', function() {
    var result = loader(path.resolve(__dirname, './sample_app/api'), '**/*.js');

    expect(result).to.have.property('controllers');
    expect(result).to.have.property('entities');
    expect(result).to.have.property('middlewares');
    expect(result).to.have.deep.property('controllers.v1');
    expect(result).to.have.deep.property('controllers.v1.usersApi');
    expect(result).to.have.deep.property('controllers.v1.rolesApi');
    expect(result).to.have.deep.property('entities.v1');
    expect(result).to.have.deep.property('entities.v1.userEntity');
    expect(result).to.have.deep.property('entities.v1.roleEntity');
    expect(result).to.have.deep.property('middlewares.authentication');
  });
});
