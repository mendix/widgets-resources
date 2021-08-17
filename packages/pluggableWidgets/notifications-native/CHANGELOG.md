# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Handle local notification "On open" actions. Note: local notification's do not handle "On receive" actions, despite being able to configure these in the modeler.

### Fixed
- A configured "Actions" property will receive the correct value; a concatenation of matching action names. 
