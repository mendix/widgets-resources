![Build Status](https://travis-ci.org/mendix/widgets-resources.svg?branch=master)
![Mendix 8](https://img.shields.io/badge/mendix-8.0.0-brightgreen.svg)
![GitHub issues](https://img.shields.io/github/issues/mendix/widgets-resources)

# Widgets resources

A bundle of R&D Platform supported widgets & nanoflow actions for building native mobile & hybrid apps.

## Native widgets

| Widget                     | Description                                                     |
| :------------------------- | :-------------------------------------------------------------- |
| [Activity indicator][]     | Display a circular loading indicator.                           |
| [Animation][]              | Provides default animations for contents and widgets.           |
| [App events][]             | Trigger actions based on load, network status and timer events. |
| [Background image][]       | Layer other widgets on top of an image.                         |
| [Badge][]                  | Display text or a value as a badge.                             |
| [Barcode scanner][]        | Scan barcode and QR code values.                                |
| [Color Picker][]           | Allows the user to select colors                                |
| [Feedback][]               | Allow users to submit feedback directly into the app project.   |
| [Floating action button][] | Display a circular floating icon button.                        |
| [Intro screen][]           | Show swipeable containers to show contents as intros            |
| [List view swipe][]        | Show controls on swipe for an interactive list view.            |
| [Maps][]                   | Show locations on an interactive map.                           |
| [Notifications][]          | Trigger actions based on incoming notifications.                |
| [Progress bar][]           | Display progress in a horizontal bar.                           |
| [Progress circle][]        | Display progress in a circle with enclosed text.                |
| [QR code][]                | Display a QR code based on a value.                             |
| [Range slider][]           | Change a range of values using a slider.                        |
| [Rating][]                 | Give a rating by selecting stars.                               |
| [Safe area view][]         | Prevent content being rendered in unsafe areas (iOS only).      |
| [Slider][]                 | Change a numeric value using a slider.                          |
| [Toggle buttons][]         | Change an enumeration value using a group of buttons.           |
| [Video player][]           | Play a video loaded from a URL.                                 |
| [Web view][]               | Display an external web page or load custom HTML.               |

## Web & Hybrid widgets

| Widget                                                                                            | Description                         |
| :------------------------------------------------------------------------------------------------ | :---------------------------------- |
| [Badge](https://github.com/mendix/widgets-resources/blob/master/packages-web/badge)               | Display text or a value as a badge. |
| [Badge Button](https://github.com/mendix/widgets-resources/blob/master/packages-web/badge-button) | Display a button with a badge.      |
| [Range Slider](https://github.com/mendix/widgets-resources/blob/master/packages-web/range-slider) | Displays a slider with min and max. |
| [Rich Text](https://github.com/mendix/widgets-resources/blob/master/packages-web/rich-text)       | Display a full text editor.         |
| [Signature](https://github.com/mendix/widgets-resources/blob/master/packages-web/signature)       | Displays a signature pad.           |
| [Slider](https://github.com/mendix/widgets-resources/blob/master/packages-web/slider)             | Display a slider.                   |
| [Switch](https://github.com/mendix/widgets-resources/blob/master/packages-web/switch)             | Displays a switch.                  |
| [Video player](https://github.com/mendix/widgets-resources/blob/master/packages-web/video-player) | Play a video loaded from a URL.     |

[activity indicator]: https://github.com/mendix/widgets-resources/blob/master/packages-native/activity-indicator
[app events]: https://github.com/mendix/widgets-resources/blob/master/packages-native/app-events
[background image]: https://github.com/mendix/widgets-resources/blob/master/packages-native/background-image
[badge]: https://github.com/mendix/widgets-resources/blob/master/packages-native/badge
[barcode scanner]: https://github.com/mendix/widgets-resources/blob/master/packages-native/barcode-scanner
[color picker]: https://github.com/mendix/widgets-resources/blob/master/packages-native/color-picker
[feedback]: https://github.com/mendix/widgets-resources/blob/master/packages-native/feedback
[floating action button]: https://github.com/mendix/widgets-resources/blob/master/packages-native/floating-action-button
[maps]: https://github.com/mendix/widgets-resources/blob/master/packages-native/maps
[notifications]: https://github.com/mendix/widgets-resources/blob/master/packages-native/notifications
[progress bar]: https://github.com/mendix/widgets-resources/blob/master/packages-native/progress-bar
[progress circle]: https://github.com/mendix/widgets-resources/blob/master/packages-native/progress-circle
[qr code]: https://github.com/mendix/widgets-resources/blob/master/packages-native/qr-code
[range slider]: https://github.com/mendix/widgets-resources/blob/master/packages-native/range-slider
[rating]: https://github.com/mendix/widgets-resources/blob/master/packages-native/rating
[slider]: https://github.com/mendix/widgets-resources/blob/master/packages-native/slider
[toggle buttons]: https://github.com/mendix/widgets-resources/blob/master/packages-native/toggle-buttons
[video player]: https://github.com/mendix/widgets-resources/blob/master/packages-native/video-player
[web view]: https://github.com/mendix/widgets-resources/blob/master/packages-native/web-view
[animation]: https://github.com/mendix/widgets-resources/blob/master/packages-native/animation
[list view swipe]: https://github.com/mendix/widgets-resources/blob/master/packages-native/listview-swipe
[intro screen]: https://github.com/mendix/widgets-resources/blob/master/packages-native/intro-screen
[safe area view]: https://github.com/mendix/widgets-resources/blob/master/packages-native/safe-area-view

## Included nanoflow actions

| Category       | Action                                |
| :------------- | :------------------------------------ |
| Authentication | Biometric authentication              |
|                | Is biometric authentication supported |
| Camera         | Save to picture library               |
|                | Take picture                          |
| Clipboard      | Get clipboard content                 |
|                | Set clipboard content                 |
| Network        | Is cellular connection                |
|                | Is connected                          |
|                | Is wifi connection                    |
| Notifications  | Cancel all scheduled notifications    |
|                | Cancel schedule notification          |
|                | Display notification                  |
|                | Get push notification token           |
|                | Has notification permission           |
|                | Request notification permission       |
|                | Schedule notification                 |
|                | Set badge number                      |
| Platform       | Change status bar                     |
|                | Get device info                       |
|                | Hide keyboard                         |
|                | Open in app browser                   |
|                | Play sound                            |
|                | Vibrate                               |

## Documentation

Please visit the [Mendix Docs](https://docs.mendix.com/refguide/native-mobile) for more information on building native
mobile apps.

## Contributing

See [CONTRIBUTING.md](https://github.com/mendix/widgets-resources/blob/master/CONTRIBUTING.md).

## Developing

-   `npm install` on root

### For developing in `packages-native`:

-   Create a simple Mendix project in Studio
-   Copy all of it's contents to `packages-native/test-project`.
-   Run `npm run build` on a desired widget folder. For ex: `packages-native/badge/`. This will build and copy the mpk
    to the test-project's correct widget folder.
-   Open and run the project in `packages-native/test-project` with Mendix Studio

### For developing in `packages-web`:

-   Mendix projects for each widget already comes with repo with folder called
    `packages-web/**WIDGETNAME**/tests/TestProjects/Mendix*`
-   Run `npm run build` on a desired widget folder. For ex: `packages-web/badge`. This will build and copy the mpk to
    each Mendix project's correct widget folder.
-   Open and run the project in `packages-native/test-project` with Mendix Studio

### For developing in `packages-common/nanoflow-commons`:

-   Create a simple Mendix project in Studio.
-   Copy all of it's contents to `packages-common/nanoflow-commons/dist/mxproject`.
-   Run `npm run build` on `packages-common/nanoflow-commons`. This will build and copy the mpk to dist/mxproject's
    correct folder.

Please bear in mind that when you develop JSActions, creation process is not automatically picked up by Modeler. Which
means:

-   First you have to create the ts file in `nanoflow-commons/src/.../ExampleName.ts` with desired content. Please take
    a look at examples in `src/client`.
-   Second you have to create a JsAction with name `ExampleName` and `parameters` in Studio.
-   Then every time `npm run build` is run, the code piece between `// BEGIN USER CODE` and `// END USER CODE` will be
    changed. After you close and open the JSAction in Studiom changes will be picked up automatically.
