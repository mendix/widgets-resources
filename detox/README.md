# Running local detox tests

To be able to run detox tests you need the following pieces:

-   2 Apks for android (in the `detox/apps` folder)
-   IPA for ios (in the `detox/apps` folder)
-   Emulator android (run `detox/apps/setup-android.sh` script)
-   Emulator iOS (run `detox/apps/setup-ios.sh` script)
-   Actual detox tests (in `packages/pluggableWidgets/<widget-name>-native`)

### Run or debug the tests:

To run all the specs(from the root directory of the repository or particular native-widget): `npm run test:e2e:local:PLATFORM_NAME`

To run one spec file(from the root directory of the repository or particular native-widget): `npm run test:e2e:local:PLATFORM_NAME FILE_NAME.spec.ts`

Debugging(from the root directory of the particular native-widget): `npm run debug:e2e:local:PLATFORM_NAME`

PLATFORM_NAME = `android` or `ios`

# Troubleshooting

`Failed to connect to websocket`

-   Make sure to disable firewalls and any other software interfering with your local network (Windows Defender, Mac Firewall, Adblockers, Network security tools)

    -   Unable to Mac firewall configurations due to lack of admin rights?

        -   Use `socketfilterfw` to alter firewall configuration `/usr/libexec/ApplicationFirewall/socketfilterfw`
        -   Helpful links:

            https://krypted.com/mac-security/command-line-firewall-management-in-os-x-10-10
            https://apple.stackexchange.com/questions/380118/how-to-debug-macos-firewall-my-application-layer-firewall-alf-is-not-logging
