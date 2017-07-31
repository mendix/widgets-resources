[![Build Status](https://travis-ci.org/mendixlabs/badge-button.svg?branch=master)](https://travis-ci.org/mendixlabs/badge-button)
[![Dependency Status](https://david-dm.org/mendixlabs/badge-button.svg)](https://david-dm.org/mendixlabs/badge-button)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/badge-button.svg#info=devDependencies)](https://david-dm.org/mendixlabs/badge-button#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/badge-button/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/badge-button)

## Badge Button

A special distinctive mark or token put on any display as a button

## Features

 * Display a badge on a button.
 * Attach an onclick microflow 
 * Set static data when the persisted data is not specified

## Dependencies

Mendix 7.2

## Demo project

[https://badgebutton.mxapps.io/](https://badgebutton.mxapps.io/)

![Demo](/assets/demo.png)
## Usage
Place the widget in the context of an object that has a value attribute.

The data source attribute specified in the `Badge` tab is optional. If not set, static data should be specified in the `Button` tab.

![Static attributes](/assets/Static_attributes.png)
![Data source](/assets/Data_source.png)
![Behavior](/assets/Behavior.png)

## Issues, suggestions and feature requests

We are actively maintaining this widget, please report any issues or suggestion for improvement at
[https://github.com/mendixlabs/badge-button/issues](https://github.com/mendixlabs/badge-button/issues)

## Developer
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    git clone https://github.com/mendixlabs/badge-button.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    npm install

Create a folder named dist in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the widget code shall be automatically pushed to this test project. Or get the test project from [https://github.com/mendixlabs/badge-button/releases/latest](https://github.com/mendixlabs/badge-button/releases/latest)

To automatically compile, bundle and push code changes to the running test project, run:

    grunt

To run the project unit tests with code coverage, results can be found at dist/testresults/coverage/index.html, run:

    npm test

or run the test continuously during development:

    karma start
