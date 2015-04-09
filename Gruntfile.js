'use strict';

var paths = {
  js: ['*.js', 'application/**/*.js', '!node_modules/**/*.js']
};

module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          args: [],
          ignore: ['node_modules/**'],
          ext: 'js',
          nodeArgs: ['--debug'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  grunt.hook.push('concurrent', 9999);
  grunt.hook.push('jshint', 200);

  grunt.registerTask('default', ['hook']);
};
