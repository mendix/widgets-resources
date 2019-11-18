## Hybrid mobile actions

A collection of nanoflow actions for hybrid mobile applications.

| Category       | Action                                |
| :------------- | :------------------------------------ |
| Authentication | Is biometric authentication supported |
|                | Biometric authentication              |
| Calendar       | Open calendar                         |
|                | Save calendar event                   |
| Camera         | Scan barcode                          |
|                | Take picture                          |
| Clipboard      | Scan barcode                          |
|                | Take picture                          |
| Contacts       | Save contact                          |
|                | Search contacts                       |
|                | Select contact                        |
| Mobile         | Change status bar                     |
|                | Search contacts                       |
|                | Get device info                       |
|                | Vibrate                               |
| Network        | Is connected                          |
|                | Is cellular connection                |
|                | Is Wi-Fi connection                   |

## Dependencies

The actions are dependent on cordova phonegap plugins. Most dependencies are already provided in the standard template.
When building your [Hybrid mobile apps](https://docs.mendix.com/developerportal/deploy/mobileapp) Please make sure you
add and enabled the decencies by:

Enabling in the `Permissions` by selecting:

-   Calendar
-   Camera
-   Photo Library
-   Contacts

And add to the `Custom Phonegap/Cordova configuration` the following snippet.

```xml
    <plugin name="cordova-plugin-android-fingerprint-auth" source="npm" spec="1.5.0" />
    <plugin name="cordova-plugin-touch-id" source="npm" spec="3.4.0" />
    <plugin name="cordova-clipboard" source="npm" spec="1.3.0" />
    <plugin name="cordova-plugin-media" source="npm" spec="5.0.2" />
```

Note: the standard template `config.xml` is already including `cordova-plugin-contacts` due to an permission structure
change for Android, cause crashes on saving, it has to be replaced by:

```xml
    <plugin name="cordova-plugin-contacts" spec="https://github.com/mendixlabs/cordova-plugin-contacts.git#3.0.2" />
```

Please note that the above plugins are not available in the in standard
[Mendix Mobile app](https://docs.mendix.com/refguide/getting-the-mendix-app) and can only be test with a
[Custom build app](https://docs.mendix.com/developerportal/deploy/mobileapp).

These configurations can also be set when
[building a custom phonegap package](https://docs.mendix.com/refguide/customizing-phonegap-build-packages#1-introduction).
