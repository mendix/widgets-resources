# Changelog
All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.3.1] Native Mobile Resources - 2021-10-25
### Fixed
- We removed some unwanted files from the module.

## [3.3.0] Native Mobile Resources - 2021-10-14

## [1.0.0] Pie Doughnut Chart
### Added
 - We added this new chart widget to display data in Pie or Doughnut chart representation.

## [3.2.0] Native Mobile Resources - 2021-9-28

## [2.0.0] Accordion
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] ActivityIndicator
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Animation
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] AppEvents
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] BackgroundImage
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Badge
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] BarChart
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] BarcodeScanner
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] BottomSheet
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Carousel
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [1.0.0] ColorPicker
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Feedback
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] FloatingActionButton
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] IntroScreen
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] LineChart
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] ListViewSwipe
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Maps
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Notifications
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] PopupMenu
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [4.0.0] ProgressBar
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] ProgressCircle
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] QRCode
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] RangeSlider
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Rating
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Repeater
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] SafeAreaView
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Slider
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] ToggleButtons
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] VideoPlayer
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] WebView
### Added
 - We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.1.4] Native Mobile Resources - 2021-09-21

### Changed
- The version of Native Mobile Resources is now stored in `themesource` directory in a file named `.version`. When this module is added to your Mendix project, the `.version` file will appear in `themesource/nativemobileresources` directory. Previously, the version was stored in a constant, seen in Studio Pro's Project Explorer. 

### Fixed
- We fixed an issue with some widget bundles erroneously including react-dom and thus were very large.
- We fixed an issue with native release (production) bundles that were being mangled incorrectly, causing runtime errors.

### [1.0.1] Bar Chart

#### Fixed
- We have fixed the data source consistency check for MX 9.2 and above.

### [1.0.1] Line Chart

#### Fixed
- We have fixed the data source consistency check for MX 9.2 and above.

### [2.1.2] Maps

#### Fixed
- We fixed an issue where dynamic markers added on the fly were not added to the maps.
- We fixed an issue where latitude or longitude with a value of 0 gave unexpected results.

### [1.1.0] Slider

#### Fixed
- We fixed an issue where the widget sometimes threw a validation error when the step size property included decimals.

## [3.1.0] Native Mobile Resources - 2021-08-26

### [2.1.0] Notifications widget

#### Added
- handle local notification "On open" actions. Note: local notification's do not handle "On receive" actions, despite being able to configure these in Studio Pro.

#### Fixed
- a configured "Actions" property will receive the correct value; a concatenation of matching action names.

## [3.0.0] Native Mobile Resources - 2021-07-14

### Changed
- TakePicture and TakePictureAdvanced actions support Android 11.
- TakePicture and TakePictureAdvanced actions no longer support 'either' as a value for the parameter "pictureSource". You can model an action sheet using the Bottom sheet widget in the case where you want to offer to users "take picture" or "choose picture from image library" functionality.
