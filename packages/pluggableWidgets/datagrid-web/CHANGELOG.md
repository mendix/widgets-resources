# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.2.0 - Unreleased

### Added
- We've implemented lazy filtering and sorting. Now the data grid v2 will not load all the data if you have sorting or filtering enabled.

### Changed
- We've fixed a problem while having text box widget inside a column with an on leave/change event it was loosing focus after trigger the events
- Prevent settings' onchange action being fired continuously while resizing a column, causing performance issues.
- Prevent the settings from being overwritten when loading a new value from the settings attribute.
