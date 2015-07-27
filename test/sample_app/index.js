var glue = require('../../');

glue.init(__dirname);

exports.apiV1 = glue.createFromApiBuilders('v1/*');
