# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.1] - 2022-7-5

### Fixed

-   We fixed the issue with filtering widgets rendered outside of header cells.

## [2.4.0] - 2022-6-29

### Fixed

-   We fixed the issue with datagrid widget not respecting layout sizing if content is too big.

## [2.3.0] - 2022-04-22

### Added

-   We added a new CSS class to the datagrid widget. That makes it easier to create CSS selector for the custom styling.

### Fixed

-   We fixed an issue with widgets not rendering on full width in datagrid cells. (Ticket #143363)

## [2.2.3] - 2022-04-13

### Fixed

-   We fixed an issue with column hiding behaviour. Now user can't uncheck last visible column in the datagrid. (Ticket #144500)

## [2.2.2] - 2022-01-19

### Fixed

-   We fixed an issue with column selector on Windows machines (Ticket #139234).

## [2.2.1] - 2022-01-06

### Changed

-   We changed the icons from front-awesome to be pure SVG.

## [2.2.0] - 2021-12-23

### Added

-   We added "Tooltip" property for column, which allow you to control text that will be seen when hovering cell.

-   We added dark mode to Structure mode preview.

-   We added dark icons for Tile and List view.

## [2.1.0] - 2021-12-03

### Added

-   We added a property to wrap texts in the columns.

## [2.0.3] - 2021-11-16

### Fixed

-   We fixed an issue causing a content inside rows to be re-rendered while using sorting or filtering.

## [2.0.2] - 2021-10-13

### Changed

-   We made the "Enable advanced options" available only for Studio users, keeping all the advanced features available by default in Studio Pro.

## [2.0.1] - 2021-10-07

### Changed

-   We added a check to prevent actions to be triggered while being executed

### Fixed

-   We fixed an issue where widgets get duplicate identifiers assigned under certain circumstances which causes inconsistencies in accessibility.

## [2.0.0] - 2021-09-28

### Added

-   We added new options to allow filtering in multiple attributes. To enable it make sure you have "Show header filters" on.

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

### Changed

-   We fixed the positioning of the filters when virtual scrolling was enabled and there was no data being presented.

-   We renamed the advanced settings property to emphasize this property is about the advanced properties' activation.

## [1.2.1] - 2021-07-01

### Changed

-   We fixed an issue with data source default sorting wasn't being applied correctly.

## [1.2.0] - 2021-06-29

### Added

-   We implemented lazy filtering and sorting. Now Data Grid v2 will not load all the data if you have sorting or filtering enabled.

-   We added an option to auto-load values from enumerations in the Data Grid drop-down filter.

-   We added the capability to restore filter values and filtered rows when navigating back from another page.

### Changed

-   We fixed a problem combining a Text Box widget inside a column with an on leave or on change event preventing focus from being lost after triggering the events.

-   We fixed an issue with headers containing attributes in the text template.

-   We prevented settings' on change action to be fired continuously while resizing a column, causing performance issues.

-   We prevented the settings from being overwritten when loading a new value from the settings attribute.

-   We fixed a misalignment between columns when a column header was empty and a filter was placed in it.
