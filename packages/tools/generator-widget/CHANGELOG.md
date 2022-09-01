# Changelog

All notable changes to this tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   We updated templates to use Cypress instead of Wdio for e2e testing purposes.

## [9.2.3] - 2022-07-04

### Changed

-   We updated required Node.js version to the current LTS version.

## [9.2.1] - 2022-02-25

### Fixed

-   We fixed an issue with generator producing invalid package.json file when user provides answers that has double quotes. (Ticket 142686)

## [9.2.0] - 2022-01-07

### Added

-   We added `@prettier/plugin-xml` plugin to fix xml code format and check for xml errors.

-   You can now choose between generating class or function components.

## [9.1.0] - 2022-01-04

### Added

-   We've added missing functions in editorPreview files.

-   We've added editorConfig file for widgets.

### Changed

-   We've updated the editorPreview files for web projects with correct properties.

-   We've updated the version of yeoman-generator to 5.4.2.

-   We've updated the configurations for tsconfig in web widgets.

-   We've updated the npm tasks and template classes for web widgets.

## [9.0.2] - 2021-05-20

### Removed

-   Links to unsupported Github issues page for bug reporting.

## [9.0.1] - 2021-04-26

### Changed

-   Explain to users in the README of a generated widget project how to install dependencies with NPM v7.x.x.

### Fixed

-   Fix failing `npm install` executions when scaffolding a widget project with the widget generator with NPM v7.x.x.

-   Set required Node.js version to v12 or higher for the generator itself and the generated widget projects, since Node.js v10 is EOL at the end of April 2021 and pluggable widgets tools requires Node.js v12.
