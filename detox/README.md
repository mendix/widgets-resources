# Running local detox tests
To be able to run detox tests you need the following pieces:


- 2 Apks for android (Create them via appdev’s native automated)
- IPA for ios (Create them via appdev’s native automated)
- Emulator android / simulator ios (Create them via appdev’s native automated)
- Locally running Mendix Studio project 
- Actual detox tests (in widgets-resources)

## How do you get APK’s and IPA:

Fortunately appdev’s automation system already built a system where you can create avd’s and necessary apk’s AND the necessary variables to be able to make it work.

Make sure you follow detox’s installation part.

For that please follow the README.md => https://gitlab.rnd.mendix.com/appdev/appdev/-/tree/master/automated/frontend/native

I made already them so feel free to go ahead and use these:

https://mendix.slack.com/archives/G01LKEB3W2U/p1620655910024400

## How do I create Emulator and Simulator:

Both for ios and android on a fresh machine, you need to install some packages. Cannot cover everything here. But you must be able to execute the Emulator with a particular name in the same Readme => https://gitlab.rnd.mendix.com/appdev/appdev/-/tree/master/automated/frontend/native

## How do I run a test:

Tell where the packages are:
First we need to tell where is our apk’s and ipa’s. To do that simply change we have to provide the following consts in terminal.


    process.env.TEST_NATIVE_APP_IOS => yourPathToIPA
    process.env.TEST_NATIVE_APP_ANDROID => yourPathTo app-debug.apk
    process.env.TEST_NATIVE_APP_ANDROID_TEST_BINARY => yourPathTo app-debug-androidTest.apk

### Which will be picked up in:
detox/detox.config.js

### Spin up Mendix project:
Every widget has its own project.

### Run or debug the tests:

To run all the specs(from the root directory of the repository or particular native-widget): `npm run test:e2e:local:PLATFORM_NAME`

To run one spec file(from the root directory of the repository or particular native-widget): `npm run test:e2e:local:PLATFORM_NAME FILE_NAME.spec.ts`

Debugging(from the root directory of the particular native-widget): `npm run debug:e2e:local:PLATFORM_NAME`

PLATFORM_NAME = `android` or `ios`

# General improvements
- List all versions of the working tools 
    - Android studio
        - avd
        - sdk
    - Xcode
    - Node
    - Java
- Add script to monorepo where we clone native template repo and build the debug APK / IPA / APP which we use to run the detox commands
    - Update `detox/detox.config.js` so the paths point to the freshly created mobile apps
    - We probably have to include the native libraries included in the MiN from appdev in order to test widgets like native maps
- Always use same iPhone & android emulators (names) so new users don’t have to update the names in `detox/detox.config.js`
- AppDev Android Studio java issue - never version of studio (atl east in 4.2) throws error when trying to run appdev’s native testing setup commands (the ones that use avdmanager, etc.). 

# Troubleshooting
`Failed to connect to websocket`
- Make sure to disable firewalls and any other software interfering with your local network (Windows Defender, Mac Firewall, Adblockers, Network security tools)
    - Unable to Mac firewall configurations due to lack of admin rights?
        - Use `socketfilterfw` to alter firewall configuration `/usr/libexec/ApplicationFirewall/socketfilterfw`
        - Helpful links:

            https://krypted.com/mac-security/command-line-firewall-management-in-os-x-10-10
            https://apple.stackexchange.com/questions/380118/how-to-debug-macos-firewall-my-application-layer-firewall-alf-is-not-logging
