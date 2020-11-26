![Build Status](https://travis-ci.org/mendix/widgets-resources.svg?branch=master)
![Mendix 8](https://img.shields.io/badge/mendix-8.0.0-brightgreen.svg)

# Widgets resources

A bundle of R&D Platform supported widgets & nanoflow actions for building native mobile & hybrid apps.

## Native widgets

Please visit the [Mendix Docs](https://docs.mendix.com/appstore/modules/native-mobile-resources) for more information on list of available native
widgets on Native Mobile Resources module.

## Web & Hybrid widgets

| Widget                                                                                                             | Description                         |
| :----------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| [Badge](https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/badge-web)               | Display text or a value as a badge. |
| [Badge Button](https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/badge-button-web) | Display a button with a badge.      |
| [Fieldset](https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/fieldset-web)         | Group form widgets.                 |
| [Range Slider](https://github.com/mendix/widgets-resources/blob/master/packages/customWidgets/range-slider-web)    | Displays a slider with min and max. |
| [Rich Text](https://github.com/mendix/widgets-resources/blob/master/packages/customWidgets/rich-text-web)          | Display a full text editor.         |
| [Signature](https://github.com/mendix/widgets-resources/blob/master/packages/customWidgets/signature-web)          | Displays a signature pad.           |
| [Slider](https://github.com/mendix/widgets-resources/blob/master/packages/customWidgets/slider-web)                | Display a slider.                   |
| [Switch](https://github.com/mendix/widgets-resources/blob/master/packages/customWidgets/switch-web)                | Displays a switch.                  |
| [Video player](https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/video-player-web) | Play a video loaded from a URL.     |

[activity indicator]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/activity-indicator-native
[app events]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/app-events-native
[background image]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/background-image-native
[badge]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/badge-native
[barcode scanner]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/barcode-scanner-native
[color picker]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/color-picker-native
[feedback]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/feedback-native
[floating action button]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/floating-action-button-native
[maps]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/maps-native
[notifications]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/notifications-native
[progress bar]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/progress-bar-native
[progress circle]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/progress-circle-native
[qr code]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/qr-code-native
[range slider]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/range-slider-native
[rating]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/rating-native
[slider]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/slider-native
[toggle buttons]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/toggle-buttons-native
[video player]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/video-player-native
[web view]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/web-view-native
[animation]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/animation-native
[list view swipe]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/listview-swipe-native
[intro screen]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/intro-screen-native
[safe area view]: https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/safe-area-view-native

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

### For developing native widgets in `packages/pluggableWidgets`:

-   Create a simple Mendix project in Studio
-   Copy all of it's contents to `packages-native/test-project`.
-   Run `npm run build` on a desired widget folder. For ex: `packages/pluggableWidgets/badge-native/`. This will build and copy the mpk
    to the test-project's correct widget folder.
-   Open and run the project in `packages-native/test-project` with Mendix Studio

### For developing web widgets in `packages/pluggableWidgets`:

-   Mendix projects for each widget already comes with repo with folder called
    `packages/pluggableWidgets/<widgetName>/tests/testProject`. If you do not see the corresponding folder, run
    `git submodule init && git submodule update`.
-   Run `npm run pretest:e2e` to initialize Mendix project.
-   Run `npm run build` on a desired widget folder. For ex: `packages/pluggableWidgets/badge-web`. This will build and copy the mpk to
    each Mendix project's correct widget folder.
-   Open and run the project in `<widgetName>/tests/testProject` with Mendix Studio

#### Adding new test project to the repo

-   Go to `https://github.com/mendix/testProjects` and create a appropriate branch name from master
-   Add your **.mpr** files, commit and push (remember your branch name)
-   Go to `widgets-resources` monorepo and in root folder execute `git submodule add -b your-branch-name-of-testprojects https://github.com/mendix/testProjects.git /necessary-folder-names/tests/testProject`

Note: Do not manually change the `.gitmodules` since this wont work when adding new submodules.

### For developing in `packages/jsActions`:

-   Create a simple Mendix project in Studio.
-   Copy all of it's contents to `packages/jsActions/nanoflow-commons/dist/mxproject`.
-   Run `npm run build` on `nanoflow-commons`. This will build and copy the mpk to dist/mxproject's
    correct folder.

Please bear in mind that when you develop JSActions, creation process is not automatically picked up by Modeler. Which
means:

-   First you have to create the ts file in `nanoflow-commons/src/.../ExampleName.ts` with desired content. Please take
    a look at examples in `src/client`.
-   Second you have to create a JsAction with name `ExampleName` and `parameters` in Studio.
-   Then every time `npm run build` is run, the code piece between `// BEGIN USER CODE` and `// END USER CODE` will be
    changed. After you close and open the JSAction in Studiom changes will be picked up automatically.

## Releasing Native Mobile Resources

-   Bump the version of the necessary widget by running `npm run version your-widget-name desired-version`
-   Create draft tag in github repo which will also create release mpk for the necessary widget `npm run publish your-widget-name`
-   Add notes to your draft
-   Update the necessary widgets to the Mendix `Native Mobile Resources` app and push the changes
-   Export the module, include every dependency
-   Create a manual tag for the exported module "Native Mobile Resources - AppStore release vx.x.x" and add the Exported Module as asset

## Commiting submodules

-   Change the test project
-   Commit and push the test project in testProjects' corresponding branch
-   Go back to monorepo, commit the shown testProjects change and push

## Raising problems/issues
-   We encourage everyone to open a Support ticket on [Mendix Support](https://support.mendix.com) in case of problems with widgets or scaffolding tools (Pluggable Widgets Generator or Pluggable Widgets Tools)
