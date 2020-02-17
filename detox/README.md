How to run tests

## Prerequisites

-   Make sure to install `brew tap wix/brew` and `brew install applesimutils`

## Developing tests locally

For the first time make sure to run

-   `npm run decompress:ios:local` in order to decompress the ios app

-   Run NativeComponentsTestProject in any of the mendix versions
-   Run `npm run test:ios:local` in order to run the ios app which will connect to `localhost:8080` for bundle requests.

## Updating the tests for travis

In order to run the tests without mendix, we put the bundle inside of the
`ios/NativeComponents.app/Bundle/index.ios.bundle`. This means that every time we update the test project, one should
also replace the contents of this file by:

-   Run NativeComponentsTestProject in desired mendix versions
-   Hitting `http://localhost:8080/n/index.bundle?platform=ios&minify=true` in firefox in order to preload the file
-   Replacing the `ios/NativeComponents.app/Bundle/index.ios.bundle` with localhost contents
-   Run `npm run compress:ios` in order to ship the changes to archived version
