"use strict";
var webpackConfig = require("./webpack.config");

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
    grunt.initConfig({
        pkgName: pkg.name,
        name: pkg.name,
        watch: {
            updateWidgetFiles: {
                "files": [ "./dist/tmp/src/**/*" ],
                "tasks": [ "compress:dist", "copy:distDeployment", "copy:mpk" ],
                options: {
                    debounceDelay: 250,
                    livereload: true
                }
            },
            sourceFiles: {
                "files": [ "./src/**/*" ],
                "tasks": [ "copy:source" ]
            }
        },

        compress: {
            dist: {
                options: {
                    archive: "./dist/" + pkg.version + "/" + pkg.name + ".mpk",
                    mode: "zip"
                },
                files: [{
                    expand: true,
                    date: new Date(),
                    store: false,
                    cwd: "./dist/tmp/src",
                    src: [ "**/*" ]
                }]
            }
        },

        copy: {
            distDeployment: {
                files: [
                    { dest: "./dist/MxTestProject/deployment/web/widgets", cwd: "./dist/tmp/src/", src: [ "**/*" ], expand: true }
                ]
            },
            mpk: {
                files: [
                    { dest: "./dist/MxTestProject/widgets", cwd: "./dist/" + pkg.version + "/", src: [ pkg.name + ".mpk" ], expand: true }
                ]
            },
            source: {
                files: [
                    { dest: "./dist/tmp/src", cwd: "./src/", src: [ "**/*", "!**/*.ts", "!**/*.css" ], expand: true }
                ]
            }
        },

        webpack: {
            renderer: webpackConfig
        },

        clean: {
            build: [
                "./dist/" + pkg.version + "/" + pkg.name + "/*",
                "./dist/tmp/**/*",
                "./dist/MxTestProject/deployment/web/widgets/" + pkg.name + "/*",
                "./dist/MxTestProject/widgets/" + pkg.name + ".mpk"
            ]
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("default", [ "clean build", "watch" ]);    
    grunt.registerTask(
        "clean build",
        "Compiles all the assets and copies the files to the build directory.", [ "clean:build", "webpack" ,"compress:dist", "copy:mpk" ]
    );
    grunt.registerTask("build", [ "clean build" ]);
};
