# Changelog

All notable changes to this widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking

-   We removed next actions: SetCookie, ReadCookie, SetFavicon, ScrollToClass.

## [2.5.0] Nanoflow Commons - 2022-7-25

### Added

-   We introduced a new set of actions:
    -   AddMilliseconds
    -   AddTime
    -   Base64Decode
    -   Base64DecodeToImage
    -   Base64Encode
    -   ClearLocalStorage
    -   FindObjectWithGUID
    -   GetCurrentLocation
    -   GetRemoteUrl
    -   GetStraightLineDistance
    -   IsConnected
    -   ReadCookie
    -   ScrollToClass
    -   SetCookie
    -   SetFavicon
    -   TimeBetween

## [2.4.0] Nanoflow Commons - 2022-6-28

### Added

-   We introduced a new [Clear cached session data] action to clear the cached session data from local storage.
-   We introdcued a new [Reload] action that reloads the app.

### Breaking

-   [Clear cached session data] action would only be compatible with Mendix client `9.14` or above.

## [2.3.1] Nanoflow Commons - 2022-3-22

### Fixed

-   Reduce module size by removing unused dependencies. This should speed up interaction with Team Server.

## [2.3.0] Nanoflow Commons - 2022-3-9

### Fixed

-   We fixed the timeout error while getting the current location.
-   We fixed a timeout issue while getting the current location with minimum accuracy.

### Breaking

-   iOS: We changed the library that uses [android.location API](https://developer.android.com/reference/android/location/package-summary), to the new library that uses the [Google Location Services API](https://developer.android.com/training/location/). Regarding this change, you should use `Request location permission` action before using `Get current location` and `Get current location with minimum accuracy` action.
-   Get current location with minimum accuracy: For good user experience, disable the nanoflow during action using property `Disabled during action` if you’re using `Call a nanoflow button` to run JS Action `Get current location with minimum accuracy`.

## [2.2.0] Nanoflow Commons - 2022-2-21

### Added

-   We introduce a new `Get current location with minimum accuracy` action to acquire more precise locations.
-   Dark theme icons for JS Actions

### Fixed

-   We fixed a bug where the `Speed` was not being defined while using `Get current location` action.
-   We removed some unwanted files from the module.

## [2.1.2] Nanoflow Commons - 2021-10-25

### Fixed

-   We fixed a problem with toggle sidebar action when executed in Native apps.
-   We removed some unwanted files from the module.

## [2.1.0] Nanoflow Commons - 2021-9-28

### Added

-   We added a toolbox tile image for all JS actions in Studio & Studio Pro.
