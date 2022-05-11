# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.5.0] Data Widgets - 2022-5-11

## [2.4.0] DatagridDateFilter

### Added

-   We added the options to filter for empty and non-empty values.

## [2.3.0] DatagridNumberFilter

### Added

-   We added the options to filter for empty and non-empty values.

## [2.3.0] DatagridTextFilter

### Added

-   We added the options to filter for empty and non-empty values.

## [2.4.0] Data Widgets - 2022-4-22

## [2.3.0] Datagrid

### Added

-   We added a new CSS class to the datagrid widget. That makes it easier to create CSS selector for the custom styling.

### Fixed

-   We fixed an issue with widgets not rendering on full width in datagrid cells. (Ticket #143363)

## [2.3.1] Data Widgets - 2022-4-13

## [2.3.1] DatagridDateFilter

### Fixed

-   We fixed a bug that was causing errors in Safari when using DateFilter in Datagrid. (Ticket #144874)

## [2.2.2] DatagridDropdownFilter

### Fixed

-   We fixed this widget to be compatible with strict CSP mode.

## [2.2.3] Datagrid

-   We fixed an issue with column hiding behaviour. Now user can't uncheck last visible column in the datagrid. (Ticket #144500)

## [2.3.0] Data Widgets - 2022-2-10

## [2.3.0] DatagridDateFilter

### Added

-   We added the possibility to apply filter between dates.

### Fixed

-   We fixed an issue with locale date format when typing it manually.

## [2.2.2] Data Widgets - 2022-1-19

## [2.2.1] DatagridDropdownFilter

### Fixed

-   We fixed an issue when selecting an invalid value for an attribute was cleaning the filter if used in Gallery or Data grid 2 header. Now it will match the correct attribute and apply the filter anyway (Ticket #138870).

## [2.2.2] Datagrid

### Fixed

-   We fixed an issue with column selector on Windows machines (Ticket #139234).

## [2.2.1] Data Widgets - 2022-1-6

### Fixed

-   We fixed the z-index of filters and column selector while using popup layouts.

### Changed

-   We changed style variables to use `!default` to allow value overriding with Atlas.

## [2.2.1] DatagridDateFilter

### Added

-   We added a class `date-filter-container` to the main container for the date picker calendar.

## [2.2.1] Datagrid

### Changed

-   We changed the icons from front-awesome to be pure SVG.

## [2.2.0] Data Widgets - 2021-12-23

## [2.2.0] DatagridDateFilter

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [2.2.0] DatagridDropdownFilter

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [2.2.0] DatagridNumberFilter

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [2.2.0] DatagridTextFilter

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [2.2.0] Datagrid

### Added

-   We added "Tooltip" property for column, which allow you to control text that will be seen when hovering cell.
-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [1.1.0] DropdownSort

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [1.1.0] Gallery

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [1.1.0] TreeNode

### Added

-   We added dark mode to Structure mode preview.
-   We added dark icons for Tile and List view.

## [2.1.1] Data Widgets - 2021-12-10

## [2.1.1] DatagridDateFilter

### Fixed

-   We fixed an issue with week start day not respecting current app settings (Ticket #136173).

### Changed

-   We aligned week days names with date picker widget from Studio Pro.

## [2.1.0] Data Widgets - 2021-12-3

## [2.1.0] Datagrid

### Added

-   We added a property to wrap texts in the columns.

## [1.0.2] TreeNode

### Fixed

-   We fixed an issue that causes design properties and styles to not be applied to the widget in Design mode & Studio.

## [2.0.3] Data Widgets - 2021-11-16

### Changed

-   We removed the Snippet, Example enumeration and version constant from the module.

### Added

-   We added a .version file inside themesource/datawidgets containing the module version.

## [2.0.3] Datagrid

### Fixed

-   We fixed an issue causing a content inside rows to be re-rendered while using sorting or filtering.

## [1.0.3] Gallery

### Fixed

-   We fixed an issue causing a content inside rows to be re-rendered while using filtering.
-

## [2.0.2] - 2021-10-13

### Filter widgets

#### Added

-   We added the possibility to store the filter value in an attribute and trigger an onChange event on every filter change.
-   We added a "Enable advanced options" toggle for Studio users.

### Data Grid 2, Gallery & Tree Node

#### Changed

-   We made the "Enable advanced options" available only for Studio users, keeping all the advanced features available by default in Studio Pro.

## [2.0.1] - 2021-10-07

### Filter widgets

#### Fixed

-   We fixed an issue where widgets get duplicate identifiers assigned under certain circumstances which causes inconsistencies in accessibility.

### Data Grid 2

#### Changed

-   We added a check to prevent actions to be triggered while being executed

#### Fixed

-   We fixed an issue where widgets get duplicate identifiers assigned under certain circumstances which causes inconsistencies in accessibility.

### Gallery

#### Changed

-   We added a check to prevent actions to be triggered while being executed

## [2.0.0] - 2021-09-28

### Added

-   We added the possibility to reuse all data grid filters with Gallery widget.
-   We added Gallery widget.
-   We added Tree-node widget.
-   We added Drop-down sort widget.

### Changed

-   We renamed Datagrid date filter to Date filter.
-   We renamed Datagrid drop-down filter to Drop-down filter.
-   We renamed Datagrid number filter to Number filter.
-   We renamed Datagrid text filter to Text filter.
