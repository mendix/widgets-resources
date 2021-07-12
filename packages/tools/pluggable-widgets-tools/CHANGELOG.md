# Changelog
All notable changes to this tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 9.3.1 - 2021-07-12
### Fixed
We fixed the preview prop typing generation for data sources.

## 9.3.0 - 2021-07-02
### Added
- We added support for testing components that make use of SVG images.

## 9.2.1 - 2021-06-16
- We reintroduced the possibility to use `.env` file for environment variables (removed in v9 previously)

## 9.2.0 - 2021-05-28

### Changed
- Update Mendix package to version 9.2.

### Fixed
- We fixed an issue with external dependencies while code was being converted to CommonJS code.

## 9.1.0 - 2021-05-25

### Changed
- Update webdriverio package to version 7.
- Update Mendix package to version 9.1.
- Replaced `@rollup/plugin-replace` with `rollup-plugin-re` due to `Unexpected errors` being thrown while using Native class based libraries.

## 9.0.3 - 2021-04-26

### Changed
- Allow only SVG files to be imported in the `editorConfig.ts` file of widgets.
- Set the file size limit of an imported SVG file to 100 kB.
- Set required node version to v12 or higher.
- Note in the README file that installation with NPM v7.x.x requires the flag `--legacy-peer-deps`.
