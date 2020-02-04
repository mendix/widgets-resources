How to run tests

## Prerequisites

-   Make sure to install `brew tap wix/brew` and `brew install applesimutils`

1. Run NativeComponentsTestProject in any of the mendix versions
2. If you want to see the simulator ui, open the specific simulator pointed out in
   `package.json/detox/configurations/ios.simulator/device/type`
3. For IOS run `npm run test:ios` or `npm run test:android`

## Developing tests locally

-   Run `npm run test:ios:local` in order to run the ios app which will connect to `localhost:8080` for bundle requests.
