# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.1] Data Widgets - 2021-12-10


## [2.1.1] DatagridDateFilter
### Fixed
- We fixed an issue with week start day not respecting current app settings (Ticket #136173).

### Changed
- We aligned week days names with date picker widget from Studio Pro.

## [2.1.0] Data Widgets - 2021-12-3


## [2.1.0] Datagrid
### Added
- We added a property to wrap texts in the columns.

## [1.0.2] TreeNode
### Fixed
- We fixed an issue that causes design properties and styles to not be applied to the widget in Design mode & Studio.

## [2.0.3] Data Widgets - 2021-11-16
### Changed
- We removed the Snippet, Example enumeration and version constant from the module.

### Added
- We added a .version file inside themesource/datawidgets containing the module version.

## [2.0.3] Datagrid
### Fixed
- We fixed an issue causing a content inside rows to be re-rendered while using sorting or filtering.

## [1.0.3] Gallery
### Fixed
- We fixed an issue causing a content inside rows to be re-rendered while using filtering.
-

## [2.0.2] - 2021-10-13

### Filter widgets

#### Added
- We added the possibility to store the filter value in an attribute and trigger an onChange event on every filter change.
- We added a "Enable advanced options" toggle for Studio users.

### Data Grid 2, Gallery & Tree Node

#### Changed
- We made the "Enable advanced options" available only for Studio users, keeping all the advanced features available by default in Studio Pro.


## [2.0.1] - 2021-10-07

### Filter widgets

#### Fixed
- We fixed an issue where widgets get duplicate identifiers assigned under certain circumstances which causes inconsistencies in accessibility.

### Data Grid 2

#### Changed
- We added a check to prevent actions to be triggered while being executed

#### Fixed
- We fixed an issue where widgets get duplicate identifiers assigned under certain circumstances which causes inconsistencies in accessibility.

### Gallery

#### Changed
- We added a check to prevent actions to be triggered while being executed

## [2.0.0] - 2021-09-28

### Added
- We added the possibility to reuse all data grid filters with Gallery widget.
- We added Gallery widget.
- We added Tree-node widget.
- We added Drop-down sort widget.

### Changed
- We renamed Datagrid date filter to Date filter.
- We renamed Datagrid drop-down filter to Drop-down filter.
- We renamed Datagrid number filter to Number filter.
- We renamed Datagrid text filter to Text filter.
