# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- We added new options to allow filtering in multiple attributes. To enable it make sure you have "Show header filters" on.

### Removed
- We removed the advanced toggle for Studio Pro (kept for Studio)

### Changed
- We fixed the positioning of the filters when virtual scrolling was enabled and there was no data being presented.

## [1.2.1] - 2021-07-01

### Changed
- We fixed an issue with data source default sorting wasn't being applied correctly.

## [1.2.0] - 2021-06-29

### Added
- We implemented lazy filtering and sorting. Now Data Grid v2 will not load all the data if you have sorting or filtering enabled.
- We added an option to auto-load values from enumerations in the Data Grid drop-down filter.
- We added the capability to restore filter values and filtered rows when navigating back from another page.

### Changed
- We fixed a problem combining a Text Box widget inside a column with an on leave or on change event preventing focus from being lost after triggering the events.
- We fixed an issue with headers containing attributes in the text template.
- We prevented settings' on change action to be fired continuously while resizing a column, causing performance issues.
- We prevented the settings from being overwritten when loading a new value from the settings attribute.
- We fixed a misalignment between columns when a column header was empty and a filter was placed in it.
