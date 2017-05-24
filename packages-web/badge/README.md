## Badge

Shows a value as a badge or a color label

## Features

 * Display as a badge or a color label
 * Attach an onclick microflow
 * Set static data text when the dynamic data is not specified

## Dependencies

Mendix 7.2

## Usage
Place the widget in the context of an object that has a value attribute.

The value attribute specified in the `General` tab is optional. If not set, a static value should be specified.
![1](https://raw.githubusercontent.com/mendixlabs/badge/v1.1.1/assets/General.png)
![1](https://raw.githubusercontent.com/mendixlabs/badge/v1.1.1/assets/Display.png)
![1](https://raw.githubusercontent.com/mendixlabs/badge/v1.1.1/assets/Events.png)

## Demo project

[https://badge.mxapps.io/](https://badge.mxapps.io/)

![1](https://raw.githubusercontent.com/mendixlabs/badge/v1.1.1/assets/demo.png)

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

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from [https://github.com/MendixLabs/badge/releases/download/v1.1.1/TestBadge.mpk](https://github.com/MendixLabs/badge/releases/download/v1.1.1/TestBadge.mpk). Changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running test project, run:

    grunt

To run the project unit tests with code coverage, results can be found at dist/testresults/coverage/index.html, run:

    npm test

or run the test continuously during development:

    karma start
