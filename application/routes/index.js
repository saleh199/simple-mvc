'use strict';

var test = require('../controllers/test');

module.exports = function(app){
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/test', function(req, res){
    res.jsonp(test.all());
  });
};
