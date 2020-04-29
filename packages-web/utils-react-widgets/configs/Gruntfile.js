"use strict";

const webpack = require("webpack");
const path = require("path");
const webpackConfig = require("./webpack.config.dev");
const webpackConfigRelease = require("./webpack.config.prod");
const variables = require("./variables");

module.exports = function(grunt) {
    const pkg = variables.package;
    const widgetName = pkg.widgetName;
    const testFolder = path.resolve(variables.path, pkg.config.testProject);
    // console.log("testFolder", testFolder);
    grunt.file.setBase(variables.path);
    grunt.initConfig({
        // cwd: variables.path,
        watch: {
            updateWidgetFiles: {
                files: ["./src/**/*"],
                tasks: ["webpack:develop", "compress", "copy"],
                options: {
                    debounceDelay: 250
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: "./dist/" + pkg.version + "/" + widgetName + ".mpk",
                    mode: "zip"
                },
                files: [
                    {
                        expand: true,
                        date: new Date(),
                        store: false,
                        cwd: "./dist/tmp/widgets",
                        src: ["**/*"]
                    }
                ]
            }
        },

        copy: {
            distDeployment: {
                files: [
                    {
                        dest: testFolder + "/deployment/web/widgets",
                        cwd: "./dist/tmp/widgets/",
                        src: ["**/*"],
                        expand: true
                    }
                ]
            },
            mpk: {
                files: [
                    {
                        dest: testFolder + "/widgets",
                        cwd: "./dist/" + pkg.version + "/",
                        src: [widgetName + ".mpk"],
                        expand: true
                    }
                ]
            }
        },
        // Don`t think this is need any longer for Studio (Pro Design mode)?
        // file_append: {
        //     addSourceURL: {
        //         files: [ {
        //             append: `\n\n//# sourceURL=${widgetName}.webmodeler.js\n`,
        //             input: `./dist/tmp/widgets/${widgetName}.webmodeler.js`
        //         } ]
        //     }
        // },

        webpack: {
            develop: webpackConfig,
            release: webpackConfigRelease
        },

        clean: {
            build: [
                "./dist/" + pkg.version + "/" + widgetName + "/*",
                "./dist/tmp/**/*",
                "./dist/tsc/**/*",
                "./dist/testresults/**/*",
                testFolder + "deployment/web/widgets/" + widgetName + "/*",
                testFolder + "widgets/" + widgetName + ".mpk"
            ]
        }
    });
    const cwd = process.cwd();
    // console.log("cwd", cwd);
    grunt.file.setBase("../utils-react-widgets");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-file-append");
    grunt.loadNpmTasks("grunt-webpack");
    grunt.file.setBase(cwd);

    grunt.registerTask("default", ["clean build", "watch"]);
    grunt.registerTask("clean build", "Compiles all the assets and copies the files to the dist directory.", [
        "clean:build",
        "webpack:develop",
        "compress:dist",
        "copy"
    ]);
    grunt.registerTask(
        "release",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["clean:build", "webpack:release", "compress:dist", "copy"]
    );
    grunt.registerTask("build", ["clean build"]);
};
