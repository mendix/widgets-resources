# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.2.2] - 2022-10-12

### Fixed

-   We fixed an issue where push notifications do not work on Android 12. This release updates "@react-native-firebase/app" and "@react-native-firebase/messaging" dependencies' version to 15.7.0. This change may break your native app unless you update it to the latest version. Ensure that your native template depends on the same version.

## [3.2.1] - 2022-04-13

### Fixed

-   We fixed an issue that occured on Android devices when using the Make it Native app to preview a page containing the Notifications widget.

## [3.2.0] - 2022-04-07

### Added

-   Structure mode preview

## [3.1.1] - 2022-03-09

### Fixed

-   We fixed the 'On open' action being triggered twice when tapping a notification while the app was in a background or quit state.

## [3.1.0] - 2022-01-24

### Added

-   Dark theme icons for Tile and List view.

## [3.0.0] - 2021-09-28

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.1.0] - 2021-08-26

### Added

-   Handle local notification "On open" actions. Note: local notification's do not handle "On receive" actions, despite being able to configure these in Studio Pro.

### Fixed

-   A configured "Actions" property will receive the correct value; a concatenation of matching action names.
