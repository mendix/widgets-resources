[![Build Status](https://travis-ci.org/mendixlabs/range-slider.svg?branch=master)](https://travis-ci.org/mendixlabs/range-slider)
[![Dependency Status](https://david-dm.org/mendixlabs/range-slider.svg)](https://david-dm.org/mendixlabs/range-slider)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/range-slider.svg#info=devDependencies)](https://david-dm.org/mendixlabs/range-slider#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/range-slider/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/range-slider)

# Range Slider
Change a range of values using a slider.

## Features
* Adjust lower bound and upper bound values on the slider
* Execute a microflow when a slider value is changed or clicked
* Show or hide a tooltip on hover
* Render range slider with different bootstrap colors

## Dependencies
Mendix 7.4

## Usage
Place the widget in the context of an object that has attributes for maximum value, minimum value, lower bound value and upper bound value

The maximum and minimum values determine the range within which the range slider values can be adjusted.

For the step value, the difference between the maximum value and the minimum value should be divisible by 2. i.e.

    (maximumValue - minimumValue) % 2 = 0

## Demo project
https://rangeslider.mxapps.io/

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestions for improvement at
https://github.com/mendixlabs/range-slider/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/range-slider.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from 

[https://github.com/MendixLabs/range-slider/releases/latest](https://github.com/MendixLabs/range-slider/releases/latest). Changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
