# Instructions

Take one of the ready build `apk` or `ipa` files from the dist folder to test against the sandbox.

If need be build build a new one:

Change to local IP or add your config in `config/environments.json`

```json
"mendixLocalMachine": {
  "name" : "HybridMobileActionsTestProject",
  "identifier" : "local.hybridmobileaction",
  "url" : "http://10.201.200.111:8080"
}
```

Build your package:

```shell
> cd packages-hybrid/hybrid-mobile-actions/tests/phonegap
> npm run package -- --env.target=mendixLocalMachine
or
> npm run package -- --env.target=sandbox
```

And upload the the package zip file from `/dist/` folder to https://build.phonegap.com.

See:

-   https://docs.mendix.com/howto/mobile/publishing-a-mendix-hybrid-mobile-app-in-mobile-app-stores
-   http://docs.phonegap.com/phonegap-build/

Or follow the documentation below to build locally. (Which you luck :D)

# Mendix PhoneGap Build App Template

Mendix apps can simply be viewed in mobile web browsers. However, some features of mobile devices cannot be accessed
through HTML and JavaScript. Also, if you want to publish your app in the Apple App Store or Google Play Store, you have
to wrap your app in a native shell. We use [Cordova/PhoneGap](https://phonegap.com) to do this. PhoneGap creates a
native wrapper around a web application and provides access to native functionality through a JavaScript API. These apps
are called _hybrid_ apps because they are a hybrid of a web and a native app.

This project contains the Mendix PhoneGap Build app template. You can use it to

-   customize your mobile Mendix app: styling, icons, splash screens and code,
-   open the platform specific code inside the appropriate IDEs,
-   debug the app using emulators,
-   build installable packages, either locally or in the cloud using [PhoneGap Build](https://build.phonegap.com).

# Table of Contents

-   [Prerequisites](#prerequisites)
-   [Build on PhoneGap](#build-on-phonegap)
-   [Customize DTAP endpoint](#customize-dtap-endpoint)
-   [App signing](#app-signing)
-   [Build and run locally](#build-run-locally)
-   [Customizing your app](#customize-app)
-   [Troubleshooting](#troubleshooting)

# <a name="prerequisites"></a>Prerequisites

Make sure that the following is installed on your system:

-   A clone of this repository or the customizable package for your app, available in the 'Deploy' section of the Mendix
    Portal. When starting from a customizable package, basic configuration for your app has already been done.
-   Recent `Node.js`. This code was tested with version 6. You can check by running `node -v`.
    -   Windows: install from [nodejs.org](https://nodejs.org/en/download/)
    -   MacOS: use [Brew](https://brew.sh/) to install `Node.js`: `brew install node`
    -   Linux, BSD, etc: install using the available package manager, e.g. on Debian: `sudo apt-get install node`
-   Java version 8

For building locally you also need a development environment for your target platform:

-   Android
    -   [Android Studio](https://developer.android.com/studio/index.html) by following
        [the instructions](https://developer.android.com/studio/install.html)
-   iOS (only available for Apple computers, e.g. MacBook, iMac)
    -   [XCode](https://developer.apple.com/xcode/)
    -   [CocoaPods](https://guides.cocoapods.org/using/getting-started.html), e.g. by running
        `sudo gem install cocoapods` (see link for sudo-less install)

# <a name="build-on-phonegap"></a>Build on PhoneGap

With the PhoneGap Build service you can build your app in the cloud, even if you haven't installed the development
environment for your target platform. This way you can target iOS without owning an Apple computer. You still need an
Apple developer account, provisioning profile and signing key. See the
[PhoneGap site](http://docs.phonegap.com/phonegap-build/signing/ios/) for more details.

To use the PhoneGap Build service you need to [register for an account](https://build.phonegap.com/plans) first. After
that, you can build your app by uploading a PhoneGap Build package, which is just a regular `.zip` file containing
JavaScript and resource files.

PhoneGap build packages target either ARM (phones and most other devices) which is the default, or x86 platforms
(emulators and other devices).

## Through uploading to PhoneGap Build

To build through the PhoneGap site, first build a PhoneGap Build package:

```
$ npm install                       # install dependencies
$ npm run package                   # create ARM PGB package in `dist` or
$ npm run package:x86               # create x86 PGB package in `dist`
```

Then, go to [https://build.phonegap.com/apps/](https://build.phonegap.com/apps/) and click the `+ new app` button. When
asked, upload the PhoneGap Build package from the `dist` folder.

## Through the command line

To build on PhoneGap Build through the command line:

```
$ npm install                       # install dependencies

$ npm run package                   # prepare `build` directory for all architectures, or
$ npm run package:x86               # prepare `build` directory for x86, or
$ npm run package:x86_64            # prepare `build` directory for x86_64, or
$ npm run package:arm               # prepare `build` directory for arm, or
$ npm run package:arm64             # prepare `build` directory for arm64

$ npm run phonegap:login            # login into the PGB service
$ npm run phonegap:build:android    # build on PGB, alternatively use `phonegap:build:ios`
```

# <a name="customize-dtap-endpoint"></a>Customize DTAP endpoint

Various environments can be set in the `config/environments.json` file. To target a specific DTAP endpoint with your app
you can specify it as a parameter to `npm run package` or `npm run package:x86`, e.g:

```
$ npm run package -- --env.target=test  # target the test endpoint for ARM architecture
```

Possible targets are `development`, `test`, `acceptance`, `production` (default) and `sandbox`. For convencience you can
shorten these to the first letter.

# <a name="app-signing"></a>App signing

In case you want to deploy your app on a real device, you will likely need to sign your app. Please refer to the
appropriate Cordova documentation for details:

-   [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#signing-an-app)
-   [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#signing-an-app)

# <a name="build-run-locally"></a>Build and run locally

If this is the initial build, first do some preparation:

```
$ npm install                       # install dependencies

$ npm run package                   # prepare `build` directory for all architectures, or
$ npm run package:x86               # prepare `build` directory for x86, or
$ npm run package:x86_64            # prepare `build` directory for x86_64, or
$ npm run package:arm               # prepare `build` directory for arm, or
$ npm run package:arm64             # prepare `build` directory for arm64

$ npm run platform:all              # setup for Android and iOS, or
$ npm run platform:android          # setup for Android, or
$ npm run platform:ios              # setup for iOS
```

If you cloned the repository or want to change some settings, edit the file `config/parameters.json` (create it if
necessary). It should at least contain the following properties, with values appropriate for your app:

```json
{
    "identifier": "io.mxapps.myapp",
    "name": "My App",
    "url": "https://myapp.mxapps.io"
}
```

For information on further customization, refer to [Customizing your app](#customizing-your-app).

Now, build and run the app:

```
$ npm run package                   # prepare `build` directory for all architectures, or
$ npm run package:x86               # prepare `build` directory for x86, or
$ npm run package:x86_64            # prepare `build` directory for x86_64, or
$ npm run package:arm               # prepare `build` directory for arm, or
$ npm run package:arm64             # prepare `build` directory for arm64

$ npm run prepare:all               # prepare phonegap platform files

$ npm run build
```

Build will generate necessary Android and IOS files in order to run the project.

Make sure you checkout the [Trouble Shooting Section](#troubleshooting)

##### For best experience open each platform project on their native IDE (Android studio for android, Xcode for IOS):

###### IOS

-   Open `./build/platforms/ios/yourAppName.xcworkspace` from your Xcode
-   In recent version of Xcode you might need to set the build system; _File > Project Settings_. Set the Shared or
    per-user project settings: the `Build system` to `Legacy Build Systems`.
-   Run the app on desired simulator

###### Android

-   Open `./build/platforms/android/` in Android Studio
-   Run the app on desired simulator

# <a name="customize-app"></a>Customizing your app

When you first download this project, it is mostly empty. All functionality and styling is by default implemented as
part of one this project's dependencies, called `mendix-hybrid-app-base`.

You can customize your hybrid app in several ways. All defaults from the base package can be overridden and/or extended,
including the build process itself.

## Folder structure

The project structure consists of the following elements:

-   `src/`: this is where you place all customizations for your app
    -   `www/`:
        -   `images`: any images that you'd like to use on e.g. the login screen
        -   `styles`: CSS files with styling for e.g. the login screen
        -   `scripts`: JavaScript files that customize the behavior of your app
        -   `index.html.mustache`: Mustache template file used to generate the index page
    -   `resources/`: icons and splash screens
    -   `config.xml.mustache`: template file that is used to generate the Phonegap configuration file
-   `config/`: this is where external configuration files go; these files are optional, overriding the defaults. Example
    files containing the defaults are put here upon `npm install`. Possible configuration files are:
    -   `environments.json`: a description of all available deployment environments for your app, including the app IDs
        and URLs
    -   `parameters.json`: settings that influence some aspects of the build process and the resulting app, such as
        Android/iOS support, offline mode, and pin login
    -   `resources.json`: descriptions of all resources, such as icons and splash screens, including their types and
        sizes
    -   `texts.json`: translations/customizations for the static texts in the hybrid shell part of your app
-   `build/`: (generated) contains all intermediate build files, such as the bundles javascript and css. The contents of
    this folder are overwritten every time you run a build
-   `dist/`: (generated) the final build packages will end up here
-   `webpack.config.js`: starting point for the build process

## Basic app settings

Several simple app settings, such as the app name and identifier, can be set in `config/parameters.json`. If you've
downloaded this project from the Mendix Portal, the file is already there. Otherwise, you can look at the
`config/parameters.json.example` file.

## Styling

To customize the styling of the login screen (including the pin screen), add a .css file to `src/www/styles/`. It will
be automatically picked up by the build process.

## Page structure

To change the structure and contents of the login screen (including the pin screen), you can adapt
`src/www/index.html.mustache`.

## Translations / custom text

All static text in the hybrid app can be customized and/or translated. To do so, create a file `config/texts.json`
containing the original text as keys and the replacement text as values. You can take a look at
`config/texts.json.example` to see which texts are available for translation.

## Icons & Splash screens

Icons and splash screens are configured in two separate places. The image files themselves should be stored in
`src/resources/`. The configuration of each icon and splash screen should be updated in `config/resources.json`. You can
take a look at `config/resources.json.example` for an example.

In case you have downloaded this package through the Mendix Portal, all configured icons and splash screens have already
been prepackaged and preconfigured.

## Client behavior (advanced)

You can run custom code in two specific cases:

-   on client configuration setup
-   on Mendix client load

To implement custom behavior for these cases, edit `src/www/scripts/entry.js`.

## Customizing the build process (advanced)

You can customize the build process by making changes to `webpack.config.js` in the root folder of this project. All
Webpack configuration you add here will be merged with the default Webpack configuration. You can read more about this
in the [webpack-merge documentation](https://www.npmjs.com/package/webpack-merge).

## Upgrading the base package

Default functionality and styling is implemented in the `mendix-hybrid-app-base` package. We will occasionally release
updates to this package. You can upgrade the base package by running `npm upgrade` from the root of your project.

# <a name="troubleshooting"></a>Troubleshooting

## PIN feature on iOS simulator

When using the PIN feature while running your app on an iOS simulator, you experience an issue where the app will prompt
you to setup a PIN every time app is launched. This is due to the underlying way Cordova access the Keychain. Either use
a device, or enable `Keychain Sharing` in `Capabilities` of your project. See
[here](https://github.com/Crypho/cordova-plugin-secure-storage/issues/48) for more information.

## iPhone X support

Please see [here](IPHONEX.md) for the steps to support iPhone X in your app.

## Building the Android project locally

When building your hybrid app locally, the Android build might fail. This can have various reasons, but it generally
boils down to version mismatches related to Gradle and/or the Android SDK in use.

### Missing Gradle installation

```
Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle
in your path, or install Android Studio
```

Either

-   open the Android project (located in `build/platforms/android`) in Android Studio and accept its suggestion to
    install the Gradle wrapper; or
-   make sure that Gradle is available on your path, e.g.
    `export PATH=$PATH:/Users/MyUser/.gradle/wrapper/dists/gradle-4.4-all/xxx/gradle-4.4/bin`.

You can find installation instruction for Gradle on the [Gradle website](https://gradle.org/install/).

### Minimum supported Gradle version is x.x.x. Current version is x.x.x. If using the gradle wrapper, try editing the distributionUrl

Make sure you are have `CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL` in your path or export it to particular terminal
session with correct distribution enabled eg:

> CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=https://services.gradle.org/distributions/gradle-x.x.x-all.zip

Bear in mind that other Cordova projects would also be effected by this change.

### No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android

In build/platforms/android/build.gradle, replace

`classpath 'com.android.tools.build:gradle:3.0.1'` with `classpath 'com.android.tools.build:gradle:3.1.2'`

and perform a Gradle sync.

### Execution failed for task ':app:processX86DebugResources' (or similar)

```
AGPBI: {"kind":"error","text":"error: resource android:attr/fontVariationSettings not found.","sources":[{"file":"/Users/UserName/.gradle/caches/transforms-1/files-1.1/support-compat-28.0.0.aar/4abf4d56829ea1da7befcfae3c8fd6c7/res/values/values.xml","position":{"startLine":132,"startColumn":4,"startOffset":7725,"endColumn":69,"endOffset":7790}}],"original":"","tool":"AAPT"}
AGPBI: {"kind":"error","text":"error: resource android:attr/ttcIndex not found.","sources":[{"file":"/Users/UserName/.gradle/caches/transforms-1/files-1.1/support-compat-28.0.0.aar/4abf4d56829ea1da7befcfae3c8fd6c7/res/values/values.xml","position":{"startLine":132,"startColumn":4,"startOffset":7725,"endColumn":69,"endOffset":7790}}],"original":"","tool":"AAPT"}
```

In build/platforms/android/project.properties, replace

`target=android-27` with `target=android-28`

and perform a Gradle sync.

### Localhost

In case you build against localhost your app might not able to run, and throw an error:
`Failed to load resource: net::ERR_CLEARTEXT_NOT_PERMITTED`.

You might have to add this element:

```
<edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
  <application android:usesCleartextTraffic="true" />
</edit-config>
```

inside of `<platform name="android">`

in `src/config.xml.mustache`

Bear in mind that this config allows http requests and it shouldn't be in your production build.

### No installed build tools found. Install the Android build tools version 19.1.0 or higher.

Even when Android Studio is installed, you might need to install to build tools separately

1. Launch Android Studio. Then go to _Preferences -> Appearance & Behavior -> System SEttings -> Android SDK_. You will
   find `Android SDK Location`. For example `/Users/${user_name}/Library/Android/sdk`.

2. Go to `SDK tools` tab and check `show package details`. `Android SDK build tools` will be there. Please make sure
   Android SDK build tools 19.1.0 or higher is installed.

3. For MacOS: Edit _~/.bash_profile_, and set ANDROID_HOME as "Android SDK Location" which you found in the Android
   Studio.

    ```
    export ANDROID_HOME=/Users/${user_name}/Library/Android/sdk
    export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
    ```

    For Windows: Edit `Environment Variables`, Add entries for the relevant locations to the PATH. For example
    (substitute the paths with your local Android SDK installation's location):

    ```
    C:\Users\[your user]\AppData\Local\Android\Sdk\platform-tools
    C:\Users\[your user]\AppData\Local\Android\Sdk\tools
    ```

See Cordova guide: [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) or
[iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)

### Adding iOS platform fails

When building your app locally, you should add the platforms of your choosing by running:

```
$ npm run platform:all              # setup for Android and iOS, or
$ npm run platform:android          # setup for Android, or
$ npm run platform:ios              # setup for iOS
```

When Android is your only target, you can choose the second option. Unfortunately, this does not work in the case of
iOS, because some plugins require the android platform to be present. To work around this, you should make sure that the
Android platform was added before running npm run package:ios, either by running `npm run platform:all`, or by running
`npm run platform:android` beforehand.

If required, you can later remove the android platform by running `npm run platform -- remove android`.

### No 'Podfile' found in the project directory

The Push Notifications plugin requires some additional components, which are installed through CocoaPods. To trigger
this installation, we always call `pod install` as part of the `platform` and `prepare` commands. If you have disabled
the push capability, this step is superfluous. This will show up in your logs as
`[!] No 'Podfile' found in the project directory`. You can safely ignore this error.

### Menu bar is cut off at the bottom (e.g. on iPhone X)

On recent iOS devices, the menu bar (Simple Menu Widget) is not always fully visible. To solve this, make the following
changes in your styling:

In your app styling:

```
html, body {
    height: 100vh; height: 100vh;
}
```

In your hybrid app styling:

```
.mx-hybridapp #content > .mx-page {
    padding-bottom: env(safe-area-inset-bottom); min-height: 100vh;
}
```

### Failed iOS build with Missing or Invalid 'Team' configuration

This can be circumvented by opening the `.xcworkspace` project located in the `build/platforms/ios` directory with XCode
and configuring the Development team in the project settings.
