[![Build Status](https://travis-ci.org/mendixlabs/progress-bar.svg?branch=master)](https://travis-ci.org/mendixlabs/progress-bar)
[![Dependency Status](https://david-dm.org/mendixlabs/progress-bar.svg)](https://david-dm.org/mendixlabs/progress-bar)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/progress-bar.svg#info=devDependencies)](https://david-dm.org/mendixlabs/progress-bar#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/progress-bar/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/progress-bar)

# Progress bar
Displays a progress bar

## Features
* Show percentage of progress based on value
* Render bar types: plain, striped or animated stripes
* Bar bootstrap colors: success, info, warning or danger

## Dependencies
Mendix 7.4

## Demo project
https://progressbar-demo.mxapps.io/

## Usage
Place the widget in the context of an object that has attributes for value and maximum value.

Progress percentage is calculated as follows:

    (value / maximumValue) * 100

If the maximum value attribute is not set, maximum value defaults to 100.

Depending on the specified bootstrap style (primary, success, info, warning, danger), the progress bar can appear in the associated colors.

For negative progress values, the bar is drawn from right to left.

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/mendixlabs/progress-bar/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/progress-bar.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from [https://github.com/mendixlabs/progress-bar/releases/latest](https://github.com/mendixlabs/progress-bar/releases/latest) Changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
