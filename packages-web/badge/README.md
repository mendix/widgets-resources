[![Build Status](https://travis-ci.org/mendixlabs/badge.svg?branch=master)](https://travis-ci.org/mendixlabs/badge)
[![Dependency Status](https://david-dm.org/mendixlabs/badge.svg)](https://david-dm.org/mendixlabs/badge)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/badge.svg#info=devDependencies)](https://david-dm.org/mendixlabs/badge#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/badge/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/badge)

## Badge

Shows a value as a badge or a color label

## Features

 * Display as a badge or a color label
 * Attach an onclick microflow
 * Set static data text when the dynamic data is not specified

## Dependencies

Mendix 7.4

## Usage
Place the widget in the context of an object that has a value attribute.

The value attribute specified in the `General` tab is optional. If not set, a static value should be specified.
![General tab](/assets/General.png)
![Display tab](/assets/Display.png)
![Events tab](/assets/Events.png)

## Demo project

[https://badge.mxapps.io/](https://badge.mxapps.io/)

![demo](/assets/demo.png)

## Issues, suggestions and feature requests

We are actively maintaining this widget, please report any issues or suggestion for improvement at
https://github.com/mendixlabs/badge/issues.

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    git clone https://github.com/mendixlabs/badge.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    npm install

Create a folder named dist in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from [https://github.com/MendixLabs/badge/releases/latest](https://github.com/MendixLabs/badge/releases/latest). Changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running test project, run:

    grunt

To run the project unit tests with code coverage, results can be found at dist/testresults/coverage/index.html, run:

    npm test

or run the test continuously during development:

    karma start
