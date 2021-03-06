'use strict';

module.exports = function(mongoose, modelsPath){

  var config = require('config'),
      glob = require('glob'),
      path = require('path');
  var connectionString = 'mongodb://';

  if(!mongoose){
    mongoose = require('mongoose');
  }

  if(config.mongoDB.options && config.mongoDB.options.user && config.mongoDB.options.password){
    connectionString += config.mongoDB.options.user + ':' + config.mongoDB.options.password + '@';
  }
  connectionString += config.mongoDB.host + ':' + config.mongoDB.port + '/' + config.mongoDB.database;

  // Create connection to MongoDB
  var db = mongoose.createConnection(connectionString, config.mongoDB.options);

  db.on('open', function(){
    console.log('\nConnected to MongoDB\n');
  });

  db.on('error', function(err){
    console.log('MongoDB ' + err);
  });


  if(config.mongoDB.debug === true){
    // use visionmedia/debug module to debug mongoose requests
    var debugMongoose = require('debug')('mongoose');
    mongoose.set('debug', function(collectionName, method, query, doc, options) {
      debugMongoose('%s.%s(%s) %s %s', collectionName, method, JSON.stringify(query), JSON.stringify(doc), JSON.stringify(options));
    });
  }

  // Autoloading models
  var files = glob.sync(modelsPath + '**/*.js', {});

  db.models = {};

  files.forEach(function(model){
    if(process.env.NODE_ENV === 'development'){
      console.log('Load : ' + model);
    }

    var modelName = path.basename(model).replace('.js', '');
    db.models[modelName] = db.model(modelName, require(model)(db));
  });
};
