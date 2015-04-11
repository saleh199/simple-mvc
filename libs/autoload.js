'use strict';

var glob = require('glob');


module.exports = function(app, directory){
  var files = glob.sync(directory + '*.js', {});

  files.forEach(function(file){
    if(process.env.NODE_ENV === 'development'){
      console.log('Load : ' + file);
    }
    require(file)(app);
  });
};
