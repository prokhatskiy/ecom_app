module.exports = function(grunt) {

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          cssDir: 'scss',
          environment: 'production'
        }
      }
    },
    includereplace: {
      dist: {
        options: {
          prefix: '@@',
          suffix: ''
        },
        src: 'layouts/*.html',
        dest: '.'
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['stylus/']
        },
        files: {
          'stylus/styles.css': ['stylus/_*.styl'] 
        }
      }
    },
    watch: {
      stylus: {
        files: ['stylus/_*.styl'],
        tasks: ['stylus','concat']
      },
      compass:{
         files: ['scss/*.scss'],
         tasks: ['compass','concat']
      },
      html: {
        files: ['blocks/*.html', 'layouts/*.html'],
        tasks: ['includereplace']
      },
      minifier: {
        files: ['css/styles.css'],
        tasks: ['cssmin']
      }
    },
    clean: {
      css: ["scss/_*.css"],
    },
    connect : {
      server : {
        options: {
          port: 8080,
          keepalive : true
        }
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['scss/styles.css','stylus/styles.css'],
        dest: 'css/styles.css',
      },
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['styles.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask( 'build', ['compass', 'stylus','concat', 'includereplace','cssmin']);
  grunt.registerTask( 'default', ['build', 'watch']);
};
