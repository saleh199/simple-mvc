'use strict';

var mongoose = require('mongoose');

module.exports = function(database){
  var schema = new mongoose.Schema({ name: 'string', size: 'string' });

  return schema;
};
