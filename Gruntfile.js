'use strict';

var paths = {
  js: ['*.js', 'application/**/*.js', 'bin/www', '!node_modules/**/*.js'],
  configFiles: ['application/config/*.json', 'Gruntfile.js']
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
      },
      configFiles: {
        files: paths.configFiles,
        options: {
          reload: true
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
          cwd: __dirname,
          env: {
            NODE_CONFIG_DIR: 'application/config'
          }
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
