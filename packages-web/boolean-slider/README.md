[![Build Status](https://travis-ci.org/mendixlabs/boolean-slider.svg?branch=master)](https://travis-ci.org/mendixlabs/boolean-slider)
[![Dependency Status](https://david-dm.org/mendixlabs/boolean-slider.svg)](https://david-dm.org/mendixlabs/boolean-slider)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/boolean-slider.svg#info=devDependencies)](https://david-dm.org/mendixlabs/boolean-slider#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/boolean-slider/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/boolean-slider)

# Switch
Toggle a boolean attribute.

## Features
* Deactivate when attribute or context is read-only
* Execute a microflow when toggled
* Add a label to the switch
* Display in either iOS style or android(material design)
* Display in various bootstrap styles

## Dependencies
Mendix 7.4

## Demo project
http://booleansliderwidge.mxapps.io

## Usage
Place the widget in the context of an object that has a boolean attribute.

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/mendixlabs/boolean-slider/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/boolean-slider.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the widget code shall be automatically pushed to this test project.

[https://github.com/MendixLabs/boolean-slider/releases/latest](https://github.com/MendixLabs/boolean-slider/releases/latest)

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
