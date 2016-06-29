module.exports = function(grunt) {
  //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express');

  grunt.initConfig({
    concat: {
      js: {
        src: ['js/board.js', 'js/game.js', 'js/main.js'],
        dest: 'dist/js/app.js',
      },
      css: {
        src: ['css/styles.css'],
        dest: 'dist/css/styles.css',
      },
    },
    copy: {
      html: {
        src: 'index.html',
        dest: 'dist/',
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['concat:js'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['css/**/*.css'],
        tasks: ['concat:css'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false,
        }
      }
    },
    express: {
      all: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: ['.'],
          livereload: true
        }
      }
    }
    // grunt-contrib-connect will serve the files of the project
    // on specified port and hostname
    // connect: {
    //   all: {
    //     options: {
    //       port: 35729,
    //       hostname: "0.0.0.0",
    //       // Prevents Grunt to close just after the task (starting the server) completes
    //       // This will be removed later as `watch` will take care of that
    //       // keepalive: true
    //     }
    //   }
    // }
  });

  grunt.registerTask('default', ['concat', 'copy', 'express', 'watch']);
};
