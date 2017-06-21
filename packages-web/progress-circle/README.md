# Progress circle
Displays a progress in a circle.

## Features
* Show the percentage based on the progress value and the maximum progress value
* Animate on load and on update
* On click open a page or run a microflow
* Show progress circle with different colors

## Dependencies
Mendix 7.1

## Usage
Place the widget in the context of an object that has attributes for value and maximum value

## Demo project
http://progresscircle.mxapps.io

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/mendixlabs/progress-circle/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/progress-circle.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.


Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from https://github.com/mendixlabs/progress-circle/releases/download/1.2.1/TestProgressCircle.mpk Changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
