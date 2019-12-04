# Maps widget

Use maps widget to show list of locations on an interactive map in your native apps.

### Example

You can find the example module at `example/Maps.mpk`. Simply
[import](https://docs.mendix.com/howto/integration/importing-and-exporting-objects#2-2-importing-module-packages) the
module package to your project.

Example is provided in order to give a baseline on how Maps widget can be implemented in a simple fashion. Please dont
forget to update the widget itself once the Module is imported.

### Features

You can select Apple maps or Google maps for IOS. For android it will be always Google maps.

The marker entry can be an address but it is not encouraged. In this case we will call device's geocoding service in
order to get the reak coordinates. This will slow down the rendering time.

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

### FAQ

### Changelog
