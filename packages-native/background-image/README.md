# Background image widget

The background image widget allows to layer other widgets on top of an image.

## Usage

Place the background image widget onto a page or inside another widget and fill it with other widgets that should layer on top of an image. Configure the widget by selecting the static or dynamic image that should be used as a background image, setting the opacity and preferred resize mode.

### Properties

#### Content

The widgets to be layered on top of the background image.

#### Image

The static or dynamic image to be used as the background.

#### Resize mode

The resize mode determines how to resize the image when the widget dimensions don't match the raw image dimensions. The following modes are supported:

-   Cover: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the widget (minus inner spacing).

-   Contain: Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the widget (minus inner spacing).

-   Stretch: Scale both dimensions (width and height) of the image independently, which may change the image's aspect ratio.

-   Center: Center the image in the widget along both dimensions. If the image is larger than the widget, scale it down uniformly so that it is contained in the widget.

Important notes:

-   The resize mode for an SVG image is always stretch.
-   The resize mode repeat is only supported on iOS.

#### Opacity

The opacity determines the transparency of the background image. The property takes a value from 0.0 - 1.0. The lower the value, the more transparent the background image.

### Custom styling

The style of the safe area is fully customizable. Apply custom styles by defining custom style classes through Atlas.
These classes should adhere to the following interface:

```ts
interface CustomImageStyle extends ImageStyle {
    svgColor?: string;
}

interface BackgroundImageStyle {
    container: ViewStyle;
    image: CustomImageStyle;
}
```

An example of a default custom style class:

```js
export const com_mendix_widget_native_backgroundimage_BackgroundImage = {
    container: {
        flex: 1
    },
    image: {
        borderRadius: 5,
        svgColor: "blue"
    }
};
```

An example of a custom style class:

```js
export const customBackgroundImage = {
    image: {
        resizeMode: "center",
        opacity: 0.8,
        svgColor: "orange"
    }
};
```

Check the official React Native documentation for further information about [ViewStyle](https://reactnative.dev/docs/view-style-props) & [ImageStyle](https://reactnative.dev/docs/image-style-props).
