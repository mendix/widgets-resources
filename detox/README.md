# Running local detox tests

## Required software

-   Android studio
-   Xcode
-   Node 14
-   Java 8

## Setup emulators

The devices that will be run on are defined in the top of the `detox/detox.config.js` file.
To prepare your environment for running the e2e tests (or when you changed the devices in the config file), first run `npm run setup-mobile` from the root of this package.

## Setup developerapp

To be able to use Detox, it is required to build an app that contains the Detox instrumentation. It is important that both the app under test with the instrumentation and the tests use a similar (preferably same) version of Detox. They need to talk to each other using the same dialect. Once they differ too much, instead of telling you these versions are not compatible, certain commands will stop working.

Note: The below setup is only required whenever we change the detox version in package.json in `widgets-resources`.

Steps:

1. In the `appdev` repo, go to the `developerapp` folder. Install the version of Detox that you want to use with the `npm i -D detox@<version>` command.
2. Run `npm run ios:clean-pod-install` in the `developerapp` dir
    1. if this fails with “CDN: trunk URL couldn't be downloaded…”,
    2. then `cd ios` & `pod repo remove trunk`
    3. then run `pod install`
3. Go to the `appdev/automated/frontend/native` folder. Run `npm run build`
4. Android files `app-detox-debug.apk` and `app-detox-debug-androidTest.apk` should be in the `appdev/developerapp/artifacts` folder.
5. iOS file `DeveloperApp.app` should be at the `appdev/developerapp/ios/build/detox/output/Build/Products/Debug-iphonesimulator/DeveloperApp.app` folder. Zip the `DeveloperApp.app` file
6. Upload the 3 files generated above at `https://www.dropbox.com/home/RnD/NativeContent/detox-apps/19.7.1`. Ensure to give rights of `Anyone with this link can view` to all the 3 files.
7. Update the scripts with new URLs at `widgets-resources/detox/scripts`
8. In `widgets-resources` root, run `npm run setup-mobile` to download the latest `developerapp` files.

## Run or debug the tests:

To run all the specs(from the root directory of the repository or particular native-widget): `npm run test:e2e:local:PLATFORM_NAME`

To run one spec file(from the root directory of the repository or particular native-widget): `npm run test:e2e:local:PLATFORM_NAME FILE_NAME.spec.ts`

Debugging(from the root directory of the particular native-widget): `npm run debug:e2e:local:PLATFORM_NAME`

PLATFORM_NAME = `android` or `ios`

## Troubleshooting

`Failed to connect to websocket`

-   Make sure to disable firewalls and any other software interfering with your local network (Windows Defender, Mac Firewall, Adblockers, Network security tools)

    -   Unable to Mac firewall configurations due to lack of admin rights?

        -   Use `socketfilterfw` to alter firewall configuration `/usr/libexec/ApplicationFirewall/socketfilterfw`
        -   Helpful links:

            https://krypted.com/mac-security/command-line-firewall-management-in-os-x-10-10
            https://apple.stackexchange.com/questions/380118/how-to-debug-macos-firewall-my-application-layer-firewall-alf-is-not-logging
