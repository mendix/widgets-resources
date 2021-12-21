# Running local detox tests

The devices that will be run on are defined in the top of the `detox/detox.config.js` file.
To prepare your environment for running the e2e tests (or when you changed the devices in the config file), first run `npm run setup-mobile` from the root of this package.

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
