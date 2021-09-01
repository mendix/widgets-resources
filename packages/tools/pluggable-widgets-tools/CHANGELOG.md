# Changelog
All notable changes to this tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [9.5.0] - 2021-09-01

### Added
- We added support for icon and tile images. Now you can use an image file instead of `<icon>` in your `MyWidget.xml`. In order to use, please make sure you follow the pattern `src/MyWidget.icon.png` (24x24px) and `src/MyWidget.tile.png` (256x192px)

### Changed
- We fixed the formatting of Preview typings
- We fixed the Preview typings for Icon property.
- We defined a fixed version of `typescript` to 4.3.5 in order to prevent processes to be hanging after creates the widget mpk. See issue [here](https://github.com/rollup/rollup/issues/4213)
- We updated Mendix library to 9.5.0

## [9.4.3] - 2021-08-12

### Changed
- We've updated rollup & rollup plugins dependencies.

## [9.4.2] - 2021-08-11

### Changed
- We changed the behavior of commonjs plugin for rollup to identify the correct way to handle require (as default or not).

## [9.4.1] - 2021-08-05

### Added
- We added an extra es6 module output (.mjs) for widgets in order to make widgets compatible with modern client.

## [9.4.0] - 2021-07-27

### Changed
- Updated Mendix package to 9.4.
- If a datasource property is optional and has not been configured by the user, any properties that are linked to that datasource property are automatically omitted from the props passed to the client component (even if they are marked as required). The generated typings have been updated to reflect this, marking such properties as optional.

## [9.3.1] - 2021-07-13

### Added
- We added support to download a Mendix test project from a GitHub repository branch.

### Fixed
- We fixed the preview prop typing generation for data sources.

## [9.3.0] - 2021-07-02

### Added
- We added support for testing components that make use of SVG images.

## [9.2.1] - 2021-06-16

### Added
- We reintroduced the possibility to use `.env` file for environment variables (removed in v9 previously)

## [9.2.0] - 2021-05-28

### Changed
- Update Mendix package to version 9.2.

### Fixed
- We fixed an issue with external dependencies while code was being converted to CommonJS code.

## [9.1.0] - 2021-05-25

### Changed
- Update webdriverio package to version 7.
- Update Mendix package to version 9.1.
- Replaced `@rollup/plugin-replace` with `rollup-plugin-re` due to `Unexpected errors` being thrown while using Native class based libraries.

## [9.0.3] - 2021-04-26

### Changed
- Allow only SVG files to be imported in the `editorConfig.ts` file of widgets.
- Set the file size limit of an imported SVG file to 100 kB.
- Set required node version to v12 or higher.
- Note in the README file that installation with NPM v7.x.x requires the flag `--legacy-peer-deps`.
