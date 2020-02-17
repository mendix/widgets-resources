# How to Setup Deep Link in Native App

## 1. Introduction

URLs are used to open a web site, but they can also be used to open an installed app. With this tutorial you will learn
how to link `app://myapp` URL to start your application on an Android or iOS device, after is was installed. It is also
possible to pass additional data via path, query parameters and hashes, for example
`app://myapp/task/123?action=close#info`

A URL is constructed by various parts, as pictured below. [TODO align with implementation names]

```txt
        userinfo       host      port
        ┌──┴───┐ ┌──────┴──────┐ ┌┴┐
https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top
└─┬─┘   └───────────┬──────────────┘└───────┬───────┘ └───────────┬─────────────┘ └┬┘
scheme          authority                  path                 query           hash
```

If you want to register the handling of normal weblink starting `http(s)://` is possible too, but requires some more
work for iOS, and is not covered in this tutorial. In that case you could check
https://www.raywenderlich.com/6080-universal-links-make-the-connection

During installation of the application it registers the `schema` and `host`, so the operating system will know what
application should be opened, for which URL. The application could either be closed or running in the background. Both
cases will be handled in the same way, but will look a bit different when executed, as the app needs to startup first.

**NOTE** Please note that deep linking will only work on a custom build Native app. The Make it native app has as a
registration schema `makeitnative://`. And does not required step chapter 3, unless you want change this you can build
your own [custom developer app](https://docs.mendix.com/howto/mobile/how-to-devapps).

## 2. Prerequisites

Before starting this how-to, make sure you have completed the following prerequisites:

-   Know how to use [Native Builder](https://docs.mendix.com/howto/mobile/native-mobile#1-introduction)
-   Installed the [Native builder](https://docs.mendix.com/releasenotes/mobile/native-builder)
-   Installed git [command line](https://git-scm.com/downloads) tool

## 3. Setup app deep linking

If you don’t have a native template for your app yet, you can create one.

1. Create a shell app with Native Builder.
1. Checkout your native builder template form GitHub

For development and this tutorial it is recommend to run the app from source against the local running Mendix Studio
Pro. This will save you a lot of time re-building and re-deploying the app. Please follow the steps from
https://docs.mendix.com/refguide/native-builder#4-advanced-usage

### 3.1 For Android apps

The manifest registers the schema and host that will be associated with your Android app.

1. Open file `android/app/src/main/AndroidManifest.xml`
1. Add in `activity` the attribute ` android:launchMode="singleTask``" ` [todo link reference Doc]
1. Add an `intent-filter` int the `activity` [todo link reference Doc]
    ```xml
    <intent-filter android:label="@string/app_name">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="app" android:host="myapp" />
    </intent-filter>
    ```

### 3.2 For iOS apps

The **plist** registers the schema and host, so that they will be associated with your app By iOS

1. Open the file `ios/NativeTemplate/Info.plist` file, and add `URL types` therein add `URL Schemes` and
   `URL identifier`, as shown in the picture below. ![ios info plist](attachments/ios-info-plist.png) When viewing the
   **Info.plist** as a text file you would see that a section is added:

    ```xml
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>app</string>
            </array>
            <key>CFBundleURLName</key>
            <string>myapp</string>
        </dict>
    </array>
    ```

1. Open the `ios/AppDelegate.swift` file and add inside the `class AppDelegate` a new method: TODO: check if still is
   needed
    ```swift
    public func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
        return RCTLinkingManager.application(app, open: url, options: options)
    }
    ```

### 3.3 Rebuild Native app

When running locally from source you have launch your app again, or us the Native builder.

1. Commit and push all changes from steps above
1. Rebuild your native app. [template](https://docs.mendix.com/howto/mobile/deploying-native-app) or
   [dev app](https://docs.mendix.com/howto/mobile/how-to-devapps).

## 4 Use deep linking in your app

When your app is ready to use links we can setup the handling. When no handling is set the app will just be opened, but
nothing is done with additional data available in URL.

### 4.1 JavaScript Actions

We now have an app with a registered URL, that can be handled. Now we have to tell it how to connect you Mendix
application with an incoming URL. We can make use of the provide JavaScript Action register and handle the deeplink. The
actions are part of thee [Native Mobile Resource](https://appstore.home.mendix.com/link/app/109513/) or on of the
up-to-date Starter App.

#### 4.1.1 Register Deep Link

This JavaScript actions registers a callback nanoflow which is called very time the app is opened with an URL. The
Callback URL Handers nanoflow will receive the URL (type string) as input parameter. Please note that the name of the
input parameter is case sensitive and should not be changed.

#### 4.1.2 Parse Url To Object

This JavaScript action will create a new Mendix object and set all available attributes with their values. For example
the URL: https://john.doe:secret@www.example.com:123/forum/questions/?tag=networking&order=newest#top

| Attribute                                                   | Value                                                                                        |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| href                                                        | https://john.doe:secret@www.example.com:123/forum/questions/?tag=networking&order=newest#top |
| protocol                                                    | https:                                                                                       |
| hash                                                        | top                                                                                          |
| query                                                       | ?tag=networking&order=newest                                                                 |
| pathname                                                    | /forum/questions/                                                                            |
| auth                                                        | john.doe                                                                                     |
| host                                                        | www.example.com:123                                                                          |
| port                                                        | 123                                                                                          |
| hostname                                                    | www.example.com                                                                              |
| password                                                    | secret                                                                                       |
| username                                                    | john.doe"                                                                                    |
| origin                                                      | https://www.example.com:123                                                                  |
| **Dynamically based on the number of slashes in the paths** |
| path0                                                       | forum                                                                                        |
| path1                                                       | questions                                                                                    |
| **Dynamically based on the number of query keys**           |
| tag                                                         | networking                                                                                   |
| order                                                       | newest                                                                                       |

### 4.2 Use it in you App

Now we have the utilities to register and process a URL. We have to use them in our application.

1. In your app add the **App events** widget on your home page, and select the `Page load on load` a nanoflow, create a
   new one named **OL_RegisterDeepLink** ![app event register deeplink](attachments/app-events-register-deeplink.png)

1. Implement this nanoflow, and add a Call a JavaScript Action that use the **RegisterDeepLink**, In the _Url handler_,
   create an nanoflow name **DL_ShowUrlDetails.**
   ![nanoflow register deeplink](attachments/nanoflow-register-deeplink.png)

1. To parse the URL into is parameter parts we should create a non persistent entity named **DeepLinkParameter**, the
   attributes are all optional and you should only add the attributes that are need for you implementation. Beside the
   standard list of possible URL parts, you can also add the keys of the query string. (For example
   `?name=Jhon&title=sir`) The attributes are not case sensitive. You can add attributes for path segments of the URL,
   they will be split into `Path0` , `Path1` etc. ![parameter entity](attachments/entity-parameter.png)

1. Implement the Deep link handler nanoflow, like the image below. The nanoflow has one input parameter named **URL**
   and is of type `string` . (Case sensitive). Call the `ParseIUrlToObject` JavaScript action, provide the URL and the
   entity of the parameter object. The Show message action will display a message with the details of the URL.
   ![nanoflow handle deep link](attachments/nanoflow-handle-deeplink.png)

### 4.3 Let Test It.

Go add some test links on your Mendix response or mobile web page, and open it in your browser of your device... click
and test!

![test page](attachments/page-test-deeplink.png)

If you running the app not from a local source, a rebuild of the app with Native builder is required before testing

## 5. Read more

-   [Native Builder](https://docs.mendix.com/refguide/native-builder)
-   [Deploying Native App](https://docs.mendix.com/howto/mobile/deploying-native-app)
-   [React Native Linking](https://facebook.github.io/react-native/docs/linking)
-   [Deep Linking Android](https://developer.android.com/training/app-links/deep-linking)
-   [Deep Linking iOS](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app)
-   [Universal Linking iOS](https://developer.apple.com/ios/universal-links/)
-   [URL Schema vs Universal Link](https://medium.com/wolox-driving-innovation/ios-deep-linking-url-scheme-vs-universal-links-50abd3802f97)

## 6. Resources

-   Sample native app repo https://github.com/Andries-Smit/native-nfc-app/tree/feat/deep-link
-   Sample project: https://www.dropbox.com/s/4mzzwh9k8nwegql/DeepLink.mpk?dl=0

## 6 ISSUES / ToDo / Notes:

-   @Danny R Lets discuss how we should move this forward to a product, or an how to?
    -   Discuss how to API: pass URL, and then split or split before calling the URL handler NF?
    -   Or use API based on url template /path/{par1}/{par2}?name={par3}#{par4}
    -   Maybe we should add filter in the **RegisterDeepLink** action, for now we can split is based path inside one
        NF.?
-   [initalURL](https://facebook.github.io/react-native/docs/linking#getinitialurl) does not work on iOS, ALM is
    researching, if it caused by them….[NALM-409](https://mendix.atlassian.net/browse/NALM-409) (WIP)
-   There is no startup NF, **App events** widget is still needed.
    [UICORE-561](https://mendix.atlassian.net/browse/UICORE-561) (On hold)
-   make it native app, add schema `makeitnative://` [NALM-421](https://mendix.atlassian.net/browse/NALM-421) (Review)
    -   Done, fails on iOS
    -   Use case open app with URL that is not available should go to QR code scanner
-   Create icons for Actions, Register deeplink, and Parse Url to Object suggestion
    [DP-61](https://mendix.atlassian.net/browse/PD-61)
-   I got a custom build of the MendixNative Lib, as it was not possible to add the bridge to the `RCTLinkingManager`
    This should be fixed by the ALM team in a better way. (WIP) [NALM-437](https://mendix.atlassian.net/browse/NALM-437)
-   Discuss first part of URL is this ‘host’ ? also for app URLs?
-   Would love to support primitive parameters, though NF with empty parameters crashes when they are used.
-   There is no way to catch an Error of the Callback NF inside the JSAction, not with try catch, check with Offline
    team.
-   Would be nice to support conversion of prop types, like number, enums, objects
-   What to do, when not logged in (valid session)? is this relevant for offline apps?
-   Check with native ALM do we need to unsubscribe?
-   Do we need how to on iOS universal (http) links?
-   new URL is not working in native client.. used polyfill. Maybe there is better one.. check url encoding support.
    https://github.com/lifaon74/url-polyfill#readme
-   Hint to open via terminal
    -   `adb shell am start -W -a android.intent.action.VIEW -d "app://myapp" com.mendix.nativetemplate`
    -   `xcrun simctl openurl booted app://myapp`
-   Ideally it would be setup in the Studio Pro like REST services parameters
    ![](https://paper-attachments.dropbox.com/s_44B43ED31E19D5B2514D19597C262F62989FAE895F2351C6F104D73BEEDC2DEF_1576003878815_image.png)

**Before publication**

-   Move action the Native Resources
-   Simplify This HowTo (remove create JS actions)
-   Fixed iOS initURL issue with ALM
-   Explain Universal link vs App links
