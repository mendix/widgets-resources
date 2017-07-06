# Slider
Change a number value using a slider

## Features
* Adjust the slider value
* Execute a microflow when a slider value is changed or clicked
* Show a tooltip on hover
* Render slider with different bootstrap colors

## Dependencies
Mendix 7.3

## Usage
Place the widget in the context of an object that has attributes for maximum value, minimum value and value

The maximum and minimum values determine the range within which the slider value can be adjusted.

For the step value, the difference between the maximum value and the minimum value should be divisible by 2. i.e.

    (maximumValue - minimumValue) % 2 = 0

## Demo project
https://slider.mxapps.io/

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestions for improvement at
https://github.com/mendixlabs/slider/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/slider.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from https://github.com/mendixlabs/slider/releases/download/1.1.1/TestSlider.mpk. Changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
