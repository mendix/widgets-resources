How to run tests

## Prerequisites

-   Make sure to install `brew tap wix/brew` and `brew install applesimutils`

## Developing tests locally

For the first time make sure to run

-   `npm run decompress:ios:local` in order to decompress the ios app

-   Run NativeComponentsTestProject in any of the mendix versions
-   Run `npm run test:ios:local` in order to run the ios app which will connect to `localhost:8080` for bundle requests.

## Updating the tests for travis

In order to run the tests without mendix, we put the bundle inside of the app itself. This means that every time we
update the test project, one should also replace the contents of this file. For ios and android it is in different
locations

### IOS

`ios/NativeComponents.app/Bundle/index.ios.bundle`.

-   Run NativeComponentsTestProject in desired mendix versions
-   Hit `http://localhost:8080/n/index.bundle?platform=ios&minify=true` in firefox in order to preload the file
-   Replace the `ios/NativeComponents.app/Bundle/index.ios.bundle` with localhost contents
-   Run `npm run compress:ios` in order to ship the changes to archived version

### Android

TODO

## How do I create new .app and apk file ?

After launching the ios app in Xcode and press play, under `Yourapp/Products` you can find the xxxx.app file which you
can drag and drop to the simulator

### Android

TODO
