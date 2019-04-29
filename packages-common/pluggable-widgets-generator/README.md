# @mendix/generator-widget [![npm version](https://badge.fury.io/js/%40mendix%2Fgenerator-widget.svg)](https://badge.fury.io/js/%40mendix%2Fgenerator-widget) [![DAVID](https://david-dm.org/@mendix/generator-widget.svg)](https://david-dm.org/@mendix/generator-widget) [![Development Dependency Status](https://david-dm.org/@mendix/generator-widget/dev-status.svg?theme=shields.io)](https://david-dm.org/@mendix/generator-widget#info=devDependencies)

[![NPM](https://nodei.co/npm/@mendix/generator-widget.svg?downloads=true&stars=true)](https://nodei.co/npm/@mendix/generator-widget/)

> [Yeoman](http://yeoman.io) generator for Mendix Pluggable Widgets.

## About

This generator uses the Yeoman scaffolding tool to let you quickly create a [Mendix Pluggable Widget](https://docs.mendix.com/howto/extensibility/pluggable-widgets).

---

## Installation

First, install [Yeoman](http://yeoman.io) and @mendix/widget using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @mendix/generator-widget
```

---

Then generate your new project inside an empty folder:

```bash
yo @mendix/widget
```

or automatically create the folder using:
```bash
yo @mendix/widget widget name
```

## Scaffold a widget

### 1. Provide the following information about your widget:

The following information needs to be provided about your widget:

* name
* description
* organization
* copyright
* license
* version
* author
* Mendix Project path
* programming language
* platform

Press <Enter> if you want to skip and use default values.

### 2.1. Using the task runner

The widget generator will include the necessary files and tasks to your package.json for running the tasks over The Pluggable Widgets Tools.

If necessary you can run the tasks using the commands

```bash
npm start
```
```bash
npm run build
```

```bash
npm run release
```
---
For more informations, visit our [Mendix Pluggable Widget Tools repository](https://github.com/mendix/pluggable-widgets-tools)

### 2.2. Which template do you want to use for the widget?

#### Full Boilerplate

The full widget boiler plate is a React fully developed and tested Mendix widget that shows a value as a badge or a color label (just available for web/responsive platform).
It has the following features:-

* Display as a badge or a color label
* Attach actions to onClick event
* Set static data text when the dynamic data is not specified

#### Empty widget

The empty template is a Mendix React hello world widget recommended for more experienced developers.

### 2.3 Add unit tests for the widget ?

If `Yes` is selected, unit tests are included to ensure individual units of the component are tested to determine whether they are fit for use. Default value is `No`.

### 2.4 Add end to end tests for the widget ?

If Yes is selected, end to end tests are included to ensure that the integrated components of an application function as expected. Default value is `No`.

Note: Both `Unit` and `End to end` tests apply only to the Full Boilerplate. `End to End` is exclusive for Web/Responsive platform.

The tool will then create Copied files, and run `npm install` to install development dependencies.

### NOTE

To use the webpack-dev-server while in your development; 
* start the Mendix Desktop Modeler from your Mendix project path or by default `/dist/MxTestProject`. then run:

```bash
npm run start
```

* If you are running the generator through many OS (Using parallels or any other virtualization software), make sure you have the right privileges and use the same OS for generation and files manipulation.

## Issues

Issues can be reported on [Github](https://github.com/mendix/pluggable-widgets-generator/issues).
