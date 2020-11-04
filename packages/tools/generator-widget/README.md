# Pluggable Widgets Generator

![npm version](https://badge.fury.io/js/%40mendix%2Fgenerator-widget.svg)
![Mendix 8](https://img.shields.io/badge/mendix-8.0.0-brightgreen.svg)
![Build Status](https://travis-ci.org/mendix/widgets-resources.svg?branch=master)
![npm](https://img.shields.io/npm/dm/@mendix/generator-widget)
![GitHub release](https://img.shields.io/github/release/mendix/widgets-resources)
![GitHub issues](https://img.shields.io/github/issues/mendix/widgets-resources)

> [Yeoman](http://yeoman.io) generator for Mendix Pluggable Widgets.

## About

This generator uses the Yeoman scaffolding tool to let you quickly create a [Mendix Pluggable Widget](https://docs.mendix.com/howto/extensibility/pluggable-widgets).

## Installation

1. Install [node.js](https://nodejs.org/) (version >= 10.15).
1. Install [Yeoman](http://yeoman.io):

    ```bash
    npm install -g yo
    ```

1. Install Pluggable Widgets Generator:

    ```bash
    npm install -g @mendix/generator-widget
    ```

## Scaffold a widget project

1. Generate your new project inside an empty folder:

    ```bash
    yo @mendix/widget
    ```

    or automatically create the folder using:

    ```bash
    yo @mendix/widget MyWidgetName
    ```

    Note that `MyWidgetName` can consist of space characters as well.

1. Provide the following information about your widget project (press <Enter> if you want to skip and use the default values):

    - Widget name
    - Description
    - Organization
    - Copyright
    - License
    - Version
    - Author
    - Mendix project path
    - Programming language
    - Platform
    - Template
    - Add unit tests
    - Add end to end tests

### Template

#### Full boilerplate

The full widget boilerplate is a fully developed and tested Mendix React widget that shows a value as a badge or a color label (just available for web/responsive platform).
It has the following features:

-   Display as a badge or a color label
-   Attach actions to onClick event
-   Set static data text when the dynamic data is not specified

#### Empty widget

The empty template is a Mendix React hello world widget recommended for more experienced developers.

### Add unit tests

If `Yes` is selected, unit tests are included to ensure individual units of the component are tested to determine whether they are fit for use. Default value is `No`.

### Add end to end tests

If `Yes` is selected, end to end tests are included to ensure that the integrated components of an application function as expected. Default value is `No`.

Note: Both `Unit` and `End to end` tests apply only to the Full Boilerplate. `End to End` is exclusive for web and hybrid mobile apps.

The tool will then create copied files, and run `npm install` to install development dependencies.

## Using the task runner

The widget generator will include the necessary files and tasks to your package.json for running the tasks over the [Pluggable Widgets Tools](https://github.com/mendix/widgets-resources/tree/master/packages/tools/pluggable-widgets-tools).

If necessary you can run the tasks using the commands:

```bash
npm start
```

```bash
npm run build
```

```bash
npm run release
```

## Note

-   To build and watch for source code changes while developing, run the Mendix project located at the specified `Mendix project path` and run:

    ```bash
    npm start
    ```

-   If you are running the generator through multiple operating systems (e.g. running a virtualized OS with Parallels on MacOS or any other virtualization software), make sure you have the right privileges and use the same OS for generation and file manipulation.

## Issues

Issues can be reported on [Github](https://github.com/mendix/widgets-resources/issues).
