module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            css: 'source/css/lib/',
            js: 'source/js/lib/',
            imgs: 'source/images/',
            output: 'public/'
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.imgs %>',
                    src: '**/*.{png,gif,jpg,sgv,pdf,ico,jpeg}',
                    dest: '<%= meta.output %>images',
                    filter: 'isFile',
                    flatten: false
                }, {
                    expand: true,
                    src: 'source/fonts/*',
                    dest: '<%= meta.output %>fonts',
                    flatten: true
                }, {
                    expand: true,
                    src: 'source/pdf/*.pdf',
                    dest: '<%= meta.output %>pdf',
                    flatten: true
                }, {
                    expand: true,
                    src: 'source/*.html',
                    dest: '<%= meta.output %>',
                    flatten: true
                }]
            }
        },
        uglify: {
            options: {
                compress: true,
                beautify: false,
                preserveComments: false
            },
            target: {
                files: [{
                    '<%= meta.output %>js/plugin.min.js': '<%= meta.js %>*.js'
                }]
            }
        },
        cssmin: {
            options: {
                advanced: false,
                keepBreaks: false,
                keepSpecialComments: 0
            },
            compress: {
                files: [{
                    '<%= meta.output %>css/plugin.min.css': '<%= meta.css %>*.css'
                }]
            }
        },
        watch: [{
            files: '<%= meta.js %>**/*',
            tasks: ['uglify']
          }, {
            files: '<%= meta.css %>**/*',
            tasks: ['cssmin']  
          }, {
            files: 'source/*.html',
            tasks: ['copy']        
        }],
        'gh-pages': {
            options: {
                base: 'public',
                branch: 'gh-pages',
                repo: 'https://github.com/thienkim-frontend/cv.git'
            },
            src: '**/*'
        }
    });
    grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
    grunt.registerTask('default', ['copy', 'cssmin', 'uglify', 'watch']);
};
