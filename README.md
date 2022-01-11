![E2E Status](https://github.com/mendix/widgets-resources/actions/workflows/WebAutomatedTests.yml/badge.svg?branch=master)
![Unit tests](https://github.com/mendix/widgets-resources/actions/workflows/UnitTests.yml/badge.svg?branch=master)
![Script Tests](https://github.com/mendix/widgets-resources/actions/workflows/ScriptTests.yml/badge.svg?branch=master)
![Atlas build](https://github.com/mendix/widgets-resources/actions/workflows/AtlasBuildTest.yml/badge.svg?branch=master)
![Atlas Release](https://github.com/mendix/widgets-resources/actions/workflows/AtlasReleaseThemeFiles.yml/badge.svg?branch=master)
![Publisn NPM](https://github.com/mendix/widgets-resources/actions/workflows/PublishNpm.yml/badge.svg?branch=master)
![Mendix 9](https://img.shields.io/badge/mendix-9.0.5-brightgreen.svg)

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
|                | Take picture advanced                 |
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

In order to use our mono repo, please make sure you are using [Node.JS v14](https://nodejs.org/download/release/latest-v14.x/) and NPM v6 (Use `npm i -g npm@latest-6`) or latest versions.

As we are using node-gyp in our dependencies, please make sure to install the requirements for this library according to your OS.
- [Windows](https://github.com/nodejs/node-gyp#on-windows)
- [Mac OS](https://github.com/nodejs/node-gyp#on-macos)
- [Linux/Unix](https://github.com/nodejs/node-gyp#on-unix)

- Execute `npm install` on root

### For developing native widgets in `packages/pluggableWidgets`:

-   Create a simple Mendix project in Studio
-   Copy all of it's contents to `packages-native/test-project`.
-   Run `npm run build` on a desired widget folder. For ex: `packages/pluggableWidgets/badge-native/`. This will build and copy the mpk
    to the test-project's correct widget folder.
-   Open and run the project in `packages-native/test-project` with Mendix Studio

### For developing web widgets in `packages/pluggableWidgets`:

-   Mendix projects for each widget already comes with repo with folder called
    `packages/pluggableWidgets/<widgetName>/tests/testProject`.
-   Run `npm run pretest:e2e` to initialize Mendix project.
-   Run `npm run build` on a desired widget folder. For ex: `packages/pluggableWidgets/badge-web`. This will build and copy the mpk to
    each Mendix project's correct widget folder.
-   Open and run the project in `<widgetName>/tests/testProject` with Mendix Studio.
-   If you want to override your local test project with a test project from GitHub, execute the `test:e2e` npm script with the following command: `npm run test:e2e -- --update-test-project`.

#### Adding new test project to the repo

-   Go to `https://github.com/mendix/testProjects` and create an appropriate branch name from master
-   Add your **.mpr** files, commit and push (remember your branch name)
-   Go to `widgets-resources` monorepo and in the `package.json` of the widget insert the branch name in the test project section.

### For developing in `packages/jsActions`:

-   Create a simple Mendix project in Studio.
-   Copy all of it's contents to `packages/jsActions/nanoflow-actions-native/dist/mxproject`.
-   Run `npm run build` on `nanoflow-actions-native`. This will build and copy the mpk to dist/mxproject's
    correct folder.

Please bear in mind that when you develop JSActions, creation process is not automatically picked up by Modeler. Which
means:

-   First you have to create the ts file in `nanoflow-actions-native/src/.../ExampleName.ts` with desired content. Please take
    a look at examples in `src/client`.
-   Second you have to create a JsAction with name `ExampleName` and `parameters` in Studio.
-   Then every time `npm run build` is run, the code piece between `// BEGIN USER CODE` and `// END USER CODE` will be
    changed. After you close and open the JSAction in Studiom changes will be picked up automatically.

## Manually releasing Native Mobile Resources (NMR)

Note: for an automated approach (preferred), see `scripts/release/README.md`.
Note: this applies to NMR for latest Studio Pro (currently 9.X) 

- With correct node version (see `.nvmrc`) in repo root, run `lerna clean -y && npm i`.
- Ensure your current git branch includes all changes intended to be released.
  - Including updates to widgets' changelogs and semver version in `package.json` and `package.xml`.
- Build all widgets in release mode; in root of repo run `npm run release:native`.
- Copy each widgets' `.mpk` to the NMR project's `/widgets` directory, overriding any existing `.mpk`s.
- (conditional) If the widget is new, it needs to be listed on the NMR project page `NativeModileResources._WidgetExport`.
  - Configure the widget with basic minimum requirements (e.g. datasource), enough to avoid any project errors.
- Ensure monorepo's `mobile-resources-native` package has correct changelog and `package.json` version.
- cd to `packages/jsActions/mobile-resources-native` and run `npm run release`.
- Delete contents of NMR project's `javascriptsource/nativemobileresources/actions`.
- Copy-and-paste files and folders inside monorepo `packages/jsActions/mobile-resources-native/dist/` to NMR project's `javascriptsource/nativemobileresources/actions/`.
- Update the version in NMR project's `themesource/nativemobileresources/.version`.
- Commit any changes to NMR project and push using git.
- Export the NMR project's module called "NativeMobileResources"; right-click the module then "export module package".
  - Exclude everything inside `userlib/` and `resources/`.
- Create a GitHub release (see previous releases for example release notes and title, etc.) and add the exported `.mpk`.
  - By aggregating the widgets' changelogs and the `mobile-resources-native` package's changelog, you can create detailed release notes.
- Create a Mendix Marketplace release and add the exported `.mpk`; follow the release-wizard, ensuring each field is correct.
  - Make sure the target Mendix version is correct.
  - Most of the time you just need to update the module's version, attach a `.mpk` and add release notes.

To release NMR for Studio Pro 8.X, most of the steps are the same, except take note of: `https://paper.dropbox.com/doc/Native-Content-Wiki--Bbd0Jfqo9nAEbmkpowVg5n3bAg-3h3CBZeVHXw8dJ1IY9xhJ#:uid=742445305119695634661853&h2=Update-NativeComponentsTestPro`.  

## Raising problems/issues
-   We encourage everyone to open a Support ticket on [Mendix Support](https://support.mendix.com) in case of problems with widgets or scaffolding tools (Pluggable Widgets Generator or Pluggable Widgets Tools)

## Troubleshooting
1. If you are having problems with the GIT hooks, where it says that the command `npm` can not be found, try adding this file to the root of your user folder.
```bash
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
