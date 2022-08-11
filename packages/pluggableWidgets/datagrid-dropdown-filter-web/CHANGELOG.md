# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.3] - 2022-8-11

### Fixed

-   We fixed an issue with sync of widget defaultValue property and current filter value (#151789)

## [2.2.2] - 2022-04-13

### Fixed

-   We fixed this widget to be compatible with strict CSP mode.

## [2.2.1] - 2022-01-19

### Fixed

-   We fixed an issue when selecting an invalid value for an attribute was cleaning the filter if used in Gallery or Data grid 2 header. Now it will match the correct attribute and apply the filter anyway (Ticket #138870).

## [2.2.0] - 2021-12-23

### Added

-   We added dark mode to Structure mode preview.

-   We added dark icons for Tile and List view.

## [2.0.2] - 2021-10-13

### Added

-   We added the possibility to store the filter value in an attribute and trigger an onChange event on every filter change.

-   We added a "Enable advanced options" toggle for Studio users.

## [2.0.1] - 2021-10-07

### Fixed

-   We fixed an issue where widgets get duplicate identifiers assigned under certain circumstances which causes inconsistencies in accessibility.

## [2.0.0] - 2021-09-28

### Added

-   We added the possibility to reuse the filter with Gallery.

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

### Changed

-   We renamed the widget to Number filter.

## [1.3.1] - 2021-07-16

### Changed

-   We fixed an issue in Drop-down filter where the default values were not working.

## [1.3.0] - 2021-07-07

### Added

-   We added support for filtering Boolean attributes. Values can be: 'true' or 'false';
