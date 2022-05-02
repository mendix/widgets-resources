# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.1.1] - 2022-04-07

### Changed

-   We changed the map image in Structure Preview.

## [3.1.0] - 2022-01-24

### Added

-   Dark theme icons for Tile and List view.

## [3.0.0] - 2021-09-28

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.1.2] - 2021-09-21

### Fixed

-   We fixed an issue where dynamic markers added on the fly were not added to the maps.

-   We fixed an issue where latitude or longitude with a value of 0 gave unexpected results.

## [2.1.1] - 2021-07-14

### Fixed

-   We have fixed the dynamic marker data source consistency check for MX 9.2 and above.

### Added

-   Structure preview for maps

-   Added consistency check to throw an error if minimum zoom level is **greater** than the maximum zoom level.

-   Added consistency check to throw an error if default zoom level is **smaller** than the minimum zoom level.

-   Added consistency check to throw an error if default zoom level is **greater** than the maximum zoom level.

-   We added the option to use dynamic markers.

### Changed

-   We now hide widget properties when they are not needed.

### Fixed

-   We fixed an issue where the default zoom level was not taken into account.

-   We fixed an issue where the maps was invisible when placed inside of another widget without a fixed height.

-   We fixed an issue where the maps showed the wrong location / "Fit to markers" didn't work when the minimum zoom level was not "World".
