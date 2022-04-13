# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.2.1] - 2022-4-13

### Fixed

-   We fixed an issue that occured on Android devices when using the Make it Native app to preview a page containing the Notifications widget.

## [3.2.0] - 2022-4-7

### Added

-   Structure mode preview

## [3.1.1] - 2022-3-9

### Fixed

-   We fixed the 'On open' action being triggered twice when tapping a notification while the app was in a background or quit state.

## [3.1.0] - 2022-1-24

### Added

-   Dark theme icons for Tile and List view.

## [3.0.0] - 2021-9-28

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.1.0] - 2021-08-26

### Added

-   Handle local notification "On open" actions. Note: local notification's do not handle "On receive" actions, despite being able to configure these in Studio Pro.

### Fixed

-   A configured "Actions" property will receive the correct value; a concatenation of matching action names.
