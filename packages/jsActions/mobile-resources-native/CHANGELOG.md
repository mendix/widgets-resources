# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   We introduce a new "RequestGenericPermission" action for requesting any desired available device permission.

## [3.10.0] Native Mobile Resources - 2022-7-11

## [2.0.0] BackgroundGradient

### Breaking

-   We added Atlas styling support for this widget. Regarding this change, you should update your [Background gradient] widgets' design properties. Please visit the [Mendix Docs](https://docs.mendix.com/refguide/mobile/designing-mobile-user-interfaces/widget-styling-guide/#1131-background-gradient) for more information on customization via Atlas.

## [3.9.1] Native Mobile Resources - 2022-6-16

## [2.2.1] BarChart

### Fixed

-   Update structure mode.
-   Update sort description.

## [2.2.1] Carousel

### Changed

-   Improved testability of widget

## [1.0.0] ColumnChart

### Added

-   Create this widget.

## [3.2.1] IntroScreen

### Fixed

-   Fixed a bug where the `On slide change` event did not always fire when swiping slides.

## [3.8.0] Native Mobile Resources - 2022-4-13

## [1.0.0] BackgroundGradient

### Added

-   We added this widget.

## [3.2.1] Notifications

### Fixed

-   We fixed an issue that occured on Android devices when using the Make it Native app to preview a page containing the Notifications widget.

## [3.7.0] Native Mobile Resources - 2022-4-7

## [2.2.0] Accordion

### Added

-   Structure mode preview

## [2.2.0] ActivityIndicator

### Added

-   We added dark mode to structure mode preview.

## [3.2.0] AppEvents

### Added

-   Structure mode preview.

## [2.2.0] BarChart

### Added

-   Structure mode preview.

## [3.2.0] BottomSheet

### Added

-   Structure mode preview

## [2.2.0] Carousel

### Added

-   Structure mode preview

## [3.2.0] IntroScreen

### Added

-   Structure mode preview.

## [2.2.0] LineChart

### Added

-   Structure mode preview.

## [3.1.1] Maps

### Changed

-   We changed the map image in Structure Preview.

## [3.2.0] Notifications

### Added

-   Structure mode preview

## [2.2.0] PopupMenu

### Added

-   Structure mode preview

## [2.2.1] RangeSlider

### Changed

-   We changed the SVG file for the structure mode preview.

## [2.2.0] Repeater

### Added

-   Structure mode preview

## [2.2.0] SafeAreaView

### Added

-   Structure mode preview

### Fixed

-   We fixed the notch area background color.

## [2.2.0] ToggleButtons

### Added

-   Structure mode preview.

## [3.2.0] WebView

### Added

-   Structure mode preview

## [3.6.0] Native Mobile Resources - 2022-3-28

## [3.2.1] Feedback

### Changed

-   Added test id

## [3.1.1] QRCode

### Added

-   Added test id

## [3.3.0] VideoPlayer

### Added

-   Android full screen support. Full screen icon can be found on top left of the video if show controls property is set to `true`, when the icon is pressed the video will continue working on an overlay modal.

## [3.5.2] Native Mobile Resources - 2022-3-22

### Fixed

-   Reduce module size by removing unused dependencies. This should speed up interaction with Team Server.

## [3.5.1] Native Mobile Resources - 2022-3-9

## [3.2.0] Feedback

### Changed

-   We have updated the feedback API

## [3.1.1] Notifications

### Fixed

-   We fixed the 'On open' action being triggered twice when tapping a notification while the app was in a background or quit state.

## [3.5.0] Native Mobile Resources - 2022-2-21

### Fixed

-   We updated the `HasNotificationPermission` action to prevent an incorrect result when permission was not yet requested on iOS. This is due to a change in the hasPermission method in react-native-firebase.

### Added

-   Dark theme icons for JS Actions

## [2.1.1] Accordion

### Fixed

-   All accordion groups will now be expanded when the widget is configured as non-collapsible.

## [2.2.0] Badge

### Added

-   Structure mode preview

## [3.2.0] BarcodeScanner

### Added

-   Structure mode preview

## [1.2.0] ColorPicker

### Added

-   Structure mode preview

## [4.2.0] ProgressBar

### Added

-   Structure mode preview

## [2.2.0] RangeSlider

### Added

-   Structure mode preview

## [2.2.0] Slider

### Added

-   Structure mode preview

## [3.2.0] VideoPlayer

### Added

-   Structure mode preview

## [3.1.1] WebView

### Fixed

-   Fixed 'Open links externally' behavior. Webview no longer directly opens externally when this option is selected and url contains unexpected capitals (in http(s) part) or does not end with a slash.

### Added

-   More test ids

## [3.4.2] Native Mobile Resources - 2022-2-7

### Fixed

-   Rating and Image widgets have been updated.

## [1.0.1] Image

### Fixed

-   The version of a react-native-vector-icons now matches that which is included in Native Template.

## [2.1.1] Rating

### Fixed

-   The widget has been refactored and now includes a version of react-native-vector-icons that matches Native Template.

## [3.4.0] Native Mobile Resources - 2022-1-24

## [2.1.0] Accordion

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] ActivityIndicator

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] Animation

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] AppEvents

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] BackgroundImage

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] Badge

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] BarChart

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] BarcodeScanner

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] BottomSheet

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] Carousel

### Added

-   Update light and dark theme icons for Tile and List view.

## [1.1.0] ColorPicker

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] Feedback

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] FloatingActionButton

### Added

-   Dark theme icons for Tile and List view.

## [1.0.0] Image

### Added

-   We introduced the widget

## [3.1.0] IntroScreen

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] LineChart

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] ListViewSwipe

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] Maps

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] Notifications

### Added

-   Dark theme icons for Tile and List view.

## [1.1.0] PieDoughnutChart

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] PopupMenu

### Added

-   Dark theme icons for Tile and List view.

## [4.1.0] ProgressBar

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] ProgressCircle

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] QRCode

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] RangeSlider

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] Rating

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] Repeater

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] SafeAreaView

### Added

-   Dark theme icons for Tile and List view.

## [2.1.0] Signature

### Added

-   Light and dark theme icons for Tile and List view.

## [2.1.0] Slider

### Added

-   Dark theme icons for Tile and List view.

## [1.0.0] Switch

### Added

-   We added this widget.

## [2.1.0] ToggleButtons

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] VideoPlayer

### Added

-   Dark theme icons for Tile and List view.

## [3.1.0] WebView

### Added

-   Dark theme icons for Tile and List view.

## [1.0.0] Radio Buttons

### Added

-   We introduced this widget.

## [3.3.1] Native Mobile Resources - 2021-10-25

### Fixed

-   We removed some unwanted files from the module.
-   We added a check to avoid a superfluous warning message on iOS regarding Push Notifications.

## [3.3.0] Native Mobile Resources - 2021-10-14

## [1.0.0] Pie Doughnut Chart

### Added

-   We added this new chart widget to display data in Pie or Doughnut chart representation.

## [3.2.0] Native Mobile Resources - 2021-9-28

## [2.0.0] Accordion

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] ActivityIndicator

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Animation

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] AppEvents

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] BackgroundImage

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Badge

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] BarChart

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] BarcodeScanner

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] BottomSheet

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Carousel

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [1.0.0] ColorPicker

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Feedback

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] FloatingActionButton

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] IntroScreen

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] LineChart

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] ListViewSwipe

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Maps

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] Notifications

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] PopupMenu

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [4.0.0] ProgressBar

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] ProgressCircle

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] QRCode

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] RangeSlider

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Rating

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Repeater

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] SafeAreaView

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] Slider

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [2.0.0] ToggleButtons

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] VideoPlayer

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.0.0] WebView

### Added

-   We added a toolbox category and toolbox tile image for Studio & Studio Pro.

## [3.1.4] Native Mobile Resources - 2021-09-21

### Changed

-   The version of Native Mobile Resources is now stored in `themesource` directory in a file named `.version`. When this module is added to your Mendix project, the `.version` file will appear in `themesource/nativemobileresources` directory. Previously, the version was stored in a constant, seen in Studio Pro's Project Explorer.

### Fixed

-   We fixed an issue with some widget bundles erroneously including react-dom and thus were very large.
-   We fixed an issue with native release (production) bundles that were being mangled incorrectly, causing runtime errors.

### [1.0.1] Bar Chart

#### Fixed

-   We have fixed the data source consistency check for MX 9.2 and above.

### [1.0.1] Line Chart

#### Fixed

-   We have fixed the data source consistency check for MX 9.2 and above.

### [2.1.2] Maps

#### Fixed

-   We fixed an issue where dynamic markers added on the fly were not added to the maps.
-   We fixed an issue where latitude or longitude with a value of 0 gave unexpected results.

### [1.1.0] Slider

#### Fixed

-   We fixed an issue where the widget sometimes threw a validation error when the step size property included decimals.

## [3.1.0] Native Mobile Resources - 2021-08-26

### [2.1.0] Notifications widget

#### Added

-   handle local notification "On open" actions. Note: local notification's do not handle "On receive" actions, despite being able to configure these in Studio Pro.

#### Fixed

-   a configured "Actions" property will receive the correct value; a concatenation of matching action names.

## [3.0.0] Native Mobile Resources - 2021-07-14

### Changed

-   TakePicture and TakePictureAdvanced actions support Android 11.
-   TakePicture and TakePictureAdvanced actions no longer support 'either' as a value for the parameter "pictureSource". You can model an action sheet using the Bottom sheet widget in the case where you want to offer to users "take picture" or "choose picture from image library" functionality.
