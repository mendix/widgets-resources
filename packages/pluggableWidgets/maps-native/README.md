# Maps widget

Use maps widget to show list of locations on an interactive map in your native apps.

### Using in Native Builder Generated Apps

In order to use this widget with google maps you will need a Google Maps API key. Simply open `android/app/src/main/AndroidManifest.xml` and add

```
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YourApiKey" />
```

inside of your `<application>` tag.

### Features

You can select Apple maps or Google maps for IOS. For android it will be always Google maps.

The marker entry can be an address, but it is not encouraged. In this case we will call device's geocoding service in
order to get the real coordinates. This will slow down the rendering time.

### Styling and Appearance

#### Through modeler

**Maps size**

-   _Square_ will fit the all the available space as long as it allows to be a square (`aspectRatio: 1/1`)
-   Max space will fit the available space without respecting any constraints

**Maps marker style**

-   _Success, warning, danger_ will simply apply the colors defined in `custom-variables.js`

#### Through custom styling

| Style Object                                                    | Description                                                           |
| --------------------------------------------------------------- | --------------------------------------------------------------------- |
| `container: ViewStyle`                                          | Will style the main container around the widget                       |
| `loadingOverlay: ViewStyle;`                                    | Will style the view which will be shown while the markers are loading |
| `loadingIndicator: {`<br>`color?: string;`<br>`};`              | Will style the indicator inside of the overlay                        |
| `marker: {`<br>`color?: string;`<br>`opacity?: number;`<br>`};` | Will style all the markers inside the map                             |
