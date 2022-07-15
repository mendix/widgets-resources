# Changelog

All notable changes to this module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

-   We updated Feedback widget to the latest version.

### Fixed

-   We fixed the issue with sidebar "Slide over content" configuration.

## [3.4.0] Atlas Core - 2022-7-11

### Fixed

-   We fixed the issue with checkbox elements producing rendering artifacts.

### Added

-   We added Atlas styling support for Background Gradient widget.

## [3.3.1] Atlas Core - 2022-6-17

### Fixed

-   We fixed custom styles issue for column chart native widget.

## [3.3.0] Atlas Core - 2022-6-16

### Added

-   We added styles for column chart native widget.

## [3.2.3] Atlas Core - 2022-6-15

### Fixed

-   We fixed hover issue for dropdown menu in navigation bar.

## [3.2.2] Atlas Core - 2022-5-10

### Added

-   We added a new design property for Tooltip widget.

## [3.2.1] Atlas Core - 2022-04-01

### Fixed

-   We fixed this module to be compatible with strict CSP mode.

## [3.2.0] Atlas Core - 2022-02-25

### Added

-   Added support for setting variables using relative length CSS units.

## [3.1.1] Atlas Core - 2022-02-18

### Fixed

-   We fixed an issue with logo covering the whole login page when opening in firefox (Ticket 141170).

## [3.1.0] Atlas Core - 2022-02-02

### Added

-   We added design properties to add shadows in containers. Thanks Ronnie van Doorn.

## [3.0.9] Atlas Core - 2022-01-24

### Fixed

-   We corrected the border styling for the Floating Action Button native widget when in Dark Mode.

## [3.0.8] Atlas Core - 2021-12-03

### Added

-   We added a design property to align the content of the image widget.

## [3.0.7] Atlas Core - 2021-09-28

### Changed

-   We fixed a problem with the styles of groupbox widget not respecting the header mode element size (Ticket #131119).

## [3.0.6] Atlas Core - 2021-08-12

### Changed

-   We fixed the z-index (priority) of the menu bar.

## [3.0.5] Atlas Core - 2021-07-27

### Changed

-   We moved resource files from web/resources to public folder.

## [3.0.4] Atlas Core - 2021-07-16

### Added

-   We added exclusion variables for core styles, layouts and bootstrap.

### Changed

-   We fixed the styles of links (added cursor pointer).
-   We fixed the sidebar sub menu items when the sidebar is closed.

### Removed

-   We removed the restrictions to show the toggle sidebar widget only on phones.
-   We removed San Francisco font from default font variable.

## [3.0.3] Atlas Core - 2021-06-29

### Added

-   Add default & helper styles for the accordion widget.
-   Add specific style variables for the accordion widget.
-   We added a default minHeight to the maps widget.
-   We added design properties for Barcode Scanner widget.

### Changed

-   We defined the module as UI Resource.
-   We fixed the behavior of sidebar and introduced new variables for open and closed width.
-   We changed the default web responsive layout sidebar to be initially open.

### Removed

-   We removed the maxWidth property of the dropdown widget to fix an issue on large screens
