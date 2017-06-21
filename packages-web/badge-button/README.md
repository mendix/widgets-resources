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

![1](https://raw.githubusercontent.com/mendixlabs/badge-button/v1.0.2/assets/demo.png)
## Usage
Place the widget in the context of an object that has a value attribute.

The data source attribute specified in the `Badge` tab is optional. If not set, static data should be specified in the `Button` tab.

![1](https://raw.githubusercontent.com/mendixlabs/badge-button/v1.0.2/assets/Static_attributes.png)
![1](https://raw.githubusercontent.com/mendixlabs/badge-button/v1.0.2/assets/Data_source.png)
![1](https://raw.githubusercontent.com/mendixlabs/badge-button/v1.0.2/assets/Behavior.png)

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

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the widget code shall be automatically pushed to this test project.

[https://github.com/MendixLabs/badge-button/releases/download/v1.0.2/TestBadgeButton.mpk](https://github.com/MendixLabs/badge-button/releases/download/v1.0.2/TestBadgeButton.mpk)

To automatically compile, bundle and push code changes to the running test project, run:

    grunt

To run the project unit tests with code coverage, results can be found at dist/testresults/coverage/index.html, run:

    npm test

or run the test continuously during development:

    karma start
