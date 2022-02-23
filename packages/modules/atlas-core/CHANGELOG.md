# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- improve usability to have the striped color of datagrids, listview and templategrids to start from even rows

### Fixed
- templategrid striped color from fixed hex color value to the correct variable

## [3.1.1] Atlas Core - 2022-2-18
### Fixed
- We fixed an issue with logo covering the whole login page when opening in firefox (Ticket 141170).

## [3.1.0] Atlas Core - 2022-2-2
### Added
- We added design properties to add shadows in containers. Thanks Ronnie van Doorn.

## [3.0.9] Atlas Core - 2022-1-24
### Fixed
- We corrected the border styling for the Floating Action Button native widget when in Dark Mode.

## [3.0.8] Atlas Core - 2021-12-3
### Added
- We added a design property to align the content of the image widget.

## [3.0.7] - 2021-09-28

### Changed
- We fixed a problem with the styles of groupbox widget not respecting the header mode element size (Ticket #131119).

## [3.0.6] - 2021-08-12

### Changed
- We fixed the z-index (priority) of the menu bar.

## [3.0.5] - 2021-07-27

### Changed
- We moved resource files from web/resources to public folder.

## [3.0.4] - 2021-07-16

### Added
- We added exclusion variables for core styles, layouts and bootstrap.

### Changed
- We fixed the styles of links (added cursor pointer).
- We fixed the sidebar sub menu items when the sidebar is closed.

### Removed
- We removed the restrictions to show the toggle sidebar widget only on phones.
- We removed San Francisco font from default font variable.

## [3.0.3] - 2021-06-29

### Added
- Add default & helper styles for the accordion widget.
- Add specific style variables for the accordion widget.
- We added a default minHeight to the maps widget.
- We added design properties for Barcode Scanner widget.

### Changed
- We defined the module as UI Resource.
- We fixed the behavior of sidebar and introduced new variables for open and closed width.
- We changed the default web responsive layout sidebar to be initially open.

### Removed
-  We removed the maxWidth property of the dropdown widget to fix an issue on large screens

