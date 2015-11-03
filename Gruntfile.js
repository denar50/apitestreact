module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

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
    },
    uglify:
    {
      options: {
        banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
      },
      build: {
        src: 'build.js',
        dest: 'build.min.js'
      }
    },
    processhtml: {
      build: {
        files: {
          'index.html': ['app/index.html']
        }
      },
      release: {
        files: {
          'index.html': ['app/index.html']
        }
      }
    }
  });

  grunt.registerTask('build', ['sass', 'browserify', 'processhtml:build']);

  grunt.registerTask('release', ['sass', 'browserify', 'uglify', 'processhtml:release']);
};
