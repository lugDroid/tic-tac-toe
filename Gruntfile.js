module.exports = function(grunt) {
  //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

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
    }
  });

  grunt.registerTask('default', ['concat', 'copy', 'watch']);
};
