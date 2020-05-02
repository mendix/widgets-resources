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

-   `start:server` Run your WEB project. Accepts --open option to auto open your browser
-   `start:js` Build and watch the changes of your JavaScript Web project
-   `start:ts` Build and watch the changes of your TypeScript Web project
-   `start:js:native` Build and watch the changes of your JavaScript Native project
-   `start:ts:native` Build and watch the changes of your Typescript Native project
-   `build:js` Build your JavaScript Web project
-   `build:ts` Build your TypeScript Web project
-   `build:js:native` Build your JavaScript Native project
-   `build:ts:native` Build your TypeScript Web project
-   `release:js` Build your JavaScript Web project for production
-   `release:ts` Build your TypeScript Web project for production
-   `release:js:native` Build your JavaScript Native project for production
-   `release:ts:native` Build your TypeScript Web project for production
-   `lint` Lint your project using ESLint and Prettier
-   `lint:fix` Fix lint problems/warning of ESLint and Prettier
-   `format` Format your code using Prettier
-   `test:unit` Run unit tests for your Web Project. Accepts option `--u` to update snapshots, `--no-cache` to remove existing caches, `--ci` assumes use of a CI environment, `--coverage` to support coverage test.
-   `test:unit:native` Run unit tests for your Native Project. Accepts option `--u` to update snapshots, `--no-cache` to remove existing caches, `--ci` assumes use of a CI environment, `--coverage` to support coverage test.
-   `test:e2e:js` Execute end-to-end tests in your JavaScript Web Project
-   `test:e2e:ts` Execute End-to-end tests in your TypeScript Web Project

#### Example

```json
"scripts": {
    "build": "pluggable-widgets-tools build:js",
    "lint": "pluggable-widgets-tools lint",
    "lint:fix": "pluggable-widgets-tools lint:fix",
    "test:unit": "pluggable-widgets-tools test:unit --coverage"
}
```

## Project layout

-   `src/`
    -   `MyWidget.xml` - widget [definition](https://docs.mendix.com/apidocs-mxsdk/apidocs/property-types-pluggable-widgets)
    -   `MyWidget.[tj]sx` - widget [client componet](https://docs.mendix.com/apidocs-mxsdk/apidocs/client-apis-for-pluggable-widgets)
    -   `MyWidget.webmodeler.[tj]sx` - (optional) widget [preview](https://docs.mendix.com/apidocs-mxsdk/apidocs/studio-apis-for-pluggable-widgets)
    -   `MyWidget.editorConfig.[tj]sx` - (optional) widget editor configuration
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
