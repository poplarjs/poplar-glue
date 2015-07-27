var Entity = require('poplar').Entity;

var RoleEntity = new Entity();

RoleEntity.expose('name', 'acls');

module.exports = RoleEntity;
