var Entity = require('poplar').Entity;

var UserEntity = new Entity();

UserEntity.expose('name', 'username', 'email');

module.exports = UserEntity;
