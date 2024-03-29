module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        nodemon: {
            development: {
                options: {
                    file: 'server.js',
                    args: ['development'],
                    watchedExtensions: ['js', 'json'],
                    watchedFolders: ['src'],
                    debug: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'asset/js',
                    name: 'main',
                    out: 'public/js/xmatome.min.js'
                }
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/assets/style/',
                    cssDir: 'public/css/'
                }
            }
        },
        simplemocha: {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {
                src: ['test/**/*.spec.js']
            }
        },
        watch: {
            requirejs: {
                files: ['asset/js/**/*.js'],
                tasks: ['requirejs'],
                options: {
                    livereload: true
                }
            },
            test: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['simplemocha']
            },
            compass: {
                files: ['asset/style/**/*.scss'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('dev', ['concurrent:dev']);
    grunt.registerTask('test', ['watch:test']);
};
