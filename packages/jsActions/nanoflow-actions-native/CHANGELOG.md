# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] Nanoflow Commons - 2022-3-8
### Fixed
- We fixed the timeout error while getting the current location.

### Breaking
- Get current location/iOS: We changed the library that uses [android.location API](https://developer.android.com/reference/android/location/package-summary), to the new library that uses the [Google Location Services API](https://developer.android.com/training/location/). Regarding this change, you should use `Request location permission` action before using `Get current location` action.

## [2.2.0] Nanoflow Commons - 2022-2-21
### Added
- We introduce a new `Get current location with minimum accuracy` action to acquire more precise locations.
- Dark theme icons for JS Actions

### Fixed
- We fixed a bug where the `Speed` was not being defined while using `Get current location` action.
- We removed some unwanted files from the module.

## [2.1.2] Nanoflow Commons - 2021-10-25
### Fixed
- We fixed a problem with toggle sidebar action when executed in Native apps.
- We removed some unwanted files from the module.

## [2.1.0] Nanoflow Commons - 2021-9-28

### Added
- We added a toolbox tile image for all JS actions in Studio & Studio Pro.
