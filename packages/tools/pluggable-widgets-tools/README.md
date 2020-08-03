# Pluggable Widgets Tools

![npm version](https://badge.fury.io/js/%40mendix%2Fpluggable-widgets-tools.svg)
![Mendix 8](https://img.shields.io/badge/mendix-8.0.0-brightgreen.svg)
![Build Status](https://travis-ci.org/mendix/widgets-resources.svg?branch=master)
![npm](https://img.shields.io/npm/dm/@mendix/pluggable-widgets-tools)
![GitHub release](https://img.shields.io/github/release/mendix/widgets-resources)
![GitHub issues](https://img.shields.io/github/issues/mendix/widgets-resources)

## About

A toolset to build, test, format, run, release and lint your [Pluggable Widgets](https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets)

## How to install

Install from npm using `npm install @mendix/pluggable-widgets-tools`. Or better create your widget using [Pluggable Widgets Generator](https://www.npmjs.com/package/@mendix/generator-widget) that scaffolds the correct project setup.

## How to use

In your `package.json` scripts, use the following command with the desired task: `pluggable-widgets-tools task`

### Available tasks

-   `start:web` Build and watch the changes of your Web widget
-   `start:server` Build and watch the changes of your Web widget. Start a web server, that reloads the widget code without the need to re-run the Mendix project. Accepts option `--open` to automatically open your browser.
-   `start:native` Build and watch the changes of your Native widget
-   `build:web` Build your Web widget
-   `build:native` Build your Native widget
-   `release:web` Create a release build of your Web widget
-   `release:native` Create a release build of your Native widget
-   `lint` Lint your project using ESLint and Prettier
-   `lint:fix` Fix lint problems/warning of ESLint and Prettier
-   `format` Format your code using Prettier
-   `test:unit:web` Run unit tests for your Web widget. Accepts option `--u` to update snapshots, `--no-cache` to remove existing caches, `--ci` assumes use of a CI environment, `--coverage` to support coverage test.
-   `test:unit:native` Run unit tests for your Native widget. Accepts option `--u` to update snapshots, `--no-cache` to remove existing caches, `--ci` assumes use of a CI environment, `--coverage` to support coverage test.
-   `test:e2e` Execute end-to-end tests in your Web widget

#### Example

```json
  "name": "MyWidget",
  "widgetName": "com.company.widgets.MyWidget",
  "version": "1.0.0",
  "config": {
    "widgetPath": "../MxTestProject/widgets",
    "projectPath": "../MxTestProject/",
    "mendixHost": "http://localhost:8080",
    "developmentPort": "3000"
  },
  "scripts": {
    "build": "pluggable-widgets-tools build:web",
    "lint": "pluggable-widgets-tools lint",
    "lint:fix": "pluggable-widgets-tools lint:fix",
    "test:unit": "pluggable-widgets-tools test:unit --coverage"
  }
```

## Project layout

-   `src/`
    -   `MyWidget.xml` - widget [definition](https://docs.mendix.com/apidocs-mxsdk/apidocs/property-types-pluggable-widgets)
    -   `MyWidget.[tj]sx` - widget [client componet](https://docs.mendix.com/apidocs-mxsdk/apidocs/client-apis-for-pluggable-widgets)
    -   `MyWidget.editorPreview.[tj]sx` - (optional) widget [preview](https://docs.mendix.com/apidocs-mxsdk/apidocs/studio-apis-for-pluggable-widgets)
    -   `MyWidget.editorConfig.[tj]s` - (optional) widget editor configuration
    -   `comopnents/`
        -   `MyComponent.[tj]s` - code of widget's components
        -   `__tests__/`
            -   `MyComponent.spec.[tj]s` - tests for widget's components
    -   `.eslint.js` - configuration for ESLint. We recoommend to just re-export `@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json`
    -   `prettier.config.js` - configuration for Prettier. We recommend to just re-export `@mendix/pluggable-widgets-tools/configs/prettier.base.json`
    -   `tsconfig.json` - configuration for TypeScript. We recommend to just extend `@mendix/pluggable-widgets-tools/configs/tsconfig.base.json`
    -   `webpack.config.dev.js` - (optional) custom configurations for webpack bundler (both for client and preview components) when running in development mode. The standard confiugration can be imported from `@mendix/pluggable-widgets-tools/configs/webpack.config.dev.js` for web and from `@mendix/pluggable-widgets-tools/configs/webpack.native.config.js` for native apps.
    -   `webpack.config.prod.js` - (optional) custom configuration for webpack bundler in release mode.
    -   `package.json` - widget package definitions, inluding its dependencies, scripts, and basic configuration (`widgetName` and `config.projectPath` in particular)

## Migrating from 8.9 to 8.10

React-hot-loader is not anymore needed to provide auto refresh functionality. That is, you can remove its usage from the code: your main entry point can simply be `export default MyWidget;` instead of `export default hot(MyWidget);`.

**If you do not change your widget, hot will be replaced with a noop function that has no effect.**
