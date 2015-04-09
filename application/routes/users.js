'use strict';

module.exports = function(app){
  /* GET users listing. */
  app.route('/users').get(function(req, res, next) {
    res.send('respond with a resource');
  });

};
