'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        watch: {
            js: {
                files: '<%= jshint.all %>',
                tasks: ['concat']
            },
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass']
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'app.js',
                    'app/**/*.js'
                    ],
                dest: '_site/assets/js/<%= pkg.name %>.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                'force': true
            },
            all: [
                'Gruntfile.js',
                'app/*.js'
            ]
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: '_site/assets/js/<%= pkg.name %>.js.map',
                sourceMappingURL: '_site/assets/js/<%= pkg.name %>.js.map',
                sourceMapPrefix: 2
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '_site/assets/js/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: true,
                    style: 'compressed'
                },
                files: {
                    '_site/assets/css/app.min.css': 'sass/style.scss'
                }
            }
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              src: ['bower_components/angular-material/angular-material.css'],
              dest: '_site/assets/css/angular-material.min.css'
            }]
          }
        },
        copy: {
          main: {
            files: [{
                expand: true,
                flatten: true,
                src: [
                  'bower_components/material-design-icons/iconfont/*.ttf',
                  'bower_components/material-design-icons/iconfont/*.woff',
                  'bower_components/material-design-icons/iconfont/*.woff2',
                  'bower_components/material-design-icons/iconfont/*.eot'
                ],
                dest: '_site/assets/fonts',
                filter: 'isFile'
              },
              {
                  expand: true,
                  flatten: true,
                  src: [
                    'app/app.css'
                  ],
                  dest: '_site/assets/css',
                  filter: 'isFile'
                }]
          }
        },
        rsync: {
            git: {
                options: {
                    src: [''],
                    args: ['--verbose'],
                    exclude: ['.git*',
                        '.idea',
                        '.sass-cache',
                        'bower_components',
                        'app',
                        'node_modules',
                        'sass',
                        '.jshintrc',
                        'bower.json',
                        '*.iml',
                        'Gruntfile.js',
                        'package.json',
                        '.DS_Store',
                        'README.md',
                        'plugin-descriptor.properties'
                    ],
                    recursive: true,
                    syncDestIgnoreExcl: true,
                    dest: '_site/'
                }
            },
            libs: {
                options: {
                    src: [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-aria/angular-aria.min.js',
                        'bower_components/angular-animate/angular-animate.min.js',
                        'bower_components/angular-messages/angular-messages.min.js',
                        'bower_components/angular-material/angular-material.min.js',
                        'bower_components/angular-sanitize/angular-sanitize.min.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                        'bower_components/underscore/underscore-min.js'
                    ],
                    args: ['--verbose'],
                    recursive: true,
                    syncDestIgnoreExcl: true,
                    dest: '_site/assets/libs/'
                }
            },
            deploy: {
                options: {
                    src: ['_site','plugin-descriptor.properties'],
                    args: ['--verbose'],
                    exclude: [
                    ],
                    recursive: true,
                    syncDestIgnoreExcl: true,
                    dest: '/Users/antoine/Development/elasticsearch-2.1.0/plugins/nightwatch'
                }
            }
        },
        devserver: {
            options: {
                port : 8888,
                base : '_site'
            },
            server: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-devserver');

    grunt.registerTask('combine',['concat:dist','uglify:dist']);
    grunt.registerTask('release', ['combine', 'cssmin', 'copy', 'rsync']);
};
