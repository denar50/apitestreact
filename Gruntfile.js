module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/app.css': 'app/scss/app.scss'
        }
      }
    },
    watch :
    {
      scripts: {
        files: ['app/**/*.js', 'app/components/*.js', 'app/actions/*.js', 'app/stores/*.js', 'app/scss/*.scss', 'app/**/*.jsx'],
        tasks: ['build']
      },
    },
    browserify:
    {
      dist:
      {
        files:
        {
          'build.js' : ['app/app.jsx']
        }
      },
      options:
      {
        transform: ['babelify']
      }
    }
  });

  grunt.registerTask('build', ['sass', 'browserify']);
};