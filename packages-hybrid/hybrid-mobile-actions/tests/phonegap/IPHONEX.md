# iPhone X support

The iPhone X is different to other iPhones in several ways. Its screen fills almost the entire front of the device, the
screen size and aspect ratio are different (375×812 points or 1125×2436 pixels), it has distinctly rounded corners, and
there's the notch: the status bar is split, leaving room for a cutout area that houses the front camera, the earpiece,
and other sensors. All this impacts how iOS apps are shown on the screen, and how iOS apps should be built (see also
[the Apple website](https://developer.apple.com/ios/update-apps-for-iphone-x/) for more info on this topic).

Mendix apps will run out of the box on an iPhone X, but in order to use the full real-estate of the screen, a few
customizations are needed. This documents explains what needs to be done.<sup>1</sup>

## Configuring storyboard images in your Mendix hybrid app

When building Mendix hybrid apps, there are three main flows to produce the installable package:

1. By going through the `Mobile App` flow in the Mendix Portal and selecting `Build in the cloud`

    This is generally the fastest and easiest way to build your Mendix hybrid app. Unfortunately, this flow does _not_
    support the new storyboard images at this moment.

1. By going through the `Mobile App` flow in the Mendix Portal and selecting `Do it yourself` (simple workflow)

    This provides you with a .zip file that contains everything you need to build a Mendix hybrid app. In this workflow,
    we change the `config.xml` file in `./dist/phonegap.zip` directly. This does not require any tooling, apart from a
    text editor.

1. By going through the `Mobile App` flow in the Mendix Portal and selecting `Do it yourself` (advanced workflow)

    An alternative approach is to make the changes in `config/resources.json`, and to follow the instructions in the
    `README.md` file to create a new `phonegap.zip`. This approach is more complex, but allows for the most flexibility
    and customizations.

### Configure the storyboard images using the simple workflow

Place the new storyboard images (using the filenames outlined below) in the `res/ios` folder of your `phonegap.zip`
file.

Remove any `<splash ... />` configuration lines within the `<platform name="ios">` element of `config.xml`. Add new
configuration lines according to the instructions [here](#single-image-launch-screen) or
[here](#multi-image-launch-screen).

Rezip everything, and upload the file to Phonegap Build.

### Configure the storyboard images using the advanced workflow

Place the new storyboard images (using the filenames outlined below) in the `src/resources/ios` folder of your hybrid
project folder (the folder in which the file you're currently reading resides).

Remove any `{"tag": "splash",` configuration lines within the `"iosImages"` element of `config/resources.json`. Add new
configuration lines according to the instructions below.

Build a new `phonegap.zip` according to the instructions in the README file, i.e. by running `npm run package`.

## Launch storyboard images

In order to support newer form factors and split-screen/slide-over multitasking, you should use launch
[storyboard images](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/launch-screen/). These
are similar to the legacy launch images above, but there are crucial differences:

-   images are not specific to a given device.
-   images are scaled to fill the available viewport (while maintaining the aspect ratio).
-   the outer edges of the images will be cropped, and the amount will vary based on device and viewport.
-   there is no need to provide an image for each possible device, viewport, and orientation; iOS will choose the best
    image for the situation automatically.

### Designing launch storyboard images

The key to designing a launch storyboard image is understanding that the edges of the image will almost certainly be
cropped. Therefore, one should not place any important information near the edges of any images provided to the launch
storyboard. Only the center is a safe area.

Therefore, the following tips should enable you to create a launch image that works across a multitude of form factors,
viewports, and orientations:

-   Important graphics (logos, icons, titles) should be centered. The safe bounding region will vary, so you will need
    to test to ensure that the important graphics are never cropped. Better yet, don't use any critical graphics on your
    launch storyboards in the first place.

    -   You _can_ fine-tune the placement and size of these graphics, but you don't have the same fine-grained control
        as you did with legacy launch images.

-   Use a simple color wash. If you use two colors, you'll want one color to fill the top half of the image, and the
    second to fill the bottom half. If you use a gradient, you'll probably want to ensure that the middle of the
    gradient lines up with the center of the image.
-   Don't worry about pixel perfection -- because the images are scaled, there's almost no chance the images will be
    perfectly fit to the pixel grid. Since all supported iOS devices use retina screens, users will be hard pressed to
    notice it anyway.

It is important to understand the concept of scale, idiom, and size class traits in order to use launch storyboard
images effectively. Of the images supplied to the launch storyboard, iOS will choose the image that best matches the
device and viewport and render that image. It is possible to supply only one launch image if so desired, but it is also
possible to fine-tune the displayed launch image based on traits. When fine-tuning, one can ignore traits that aren't
targeted or supported by the app.

> Note: If you are using launch storyboard images, there is no need to include legacy images. If you do, the legacy
> images will be copied, but not used.

### Scale

| scale |        devices         |
| :---: | :--------------------: |
|  1x   | All non-retina devices |
|  2x   |  Most retina devices   |
|  3x   |   iPhone 6+/6s+,7s+    |

In general, you'll want to supply 2x and 3x images. Cordova only supports retina devices now, so there's no point in
supplying 1x images.

### Idioms

|   idiom   |           devices            |
| :-------: | :--------------------------: |
|   ipad    |          All iPads           |
|  iphone   | All iPhones and iPod Touches |
| universal |         All devices          |

You only need to provide universal images unless you need to fine-tune for a specific device idiom.

### Size classes

There are two size classes applies to both screen axes. Narrow viewports are considered to be the "compact" size class,
and remaining viewports are considered "regular". When supplying images to Xcode, however, one must choose between "any
& compact" and "any & regular". To stay consistent with the native terminology, this feature will match based on "any"
and "compact". `any` will match regular-sized viewports.

Note: this feature uses `com` as an abbreviation for "compact" classes.

The following classes are supported by this feature:

| width | height |    orientation     |
| :---: | :----: | :----------------: |
|  any  |  any   |        any         |
|  com  |  any   |      portrait      |
|  any  |  com   |  landscape (wide)  |
|  com  |  com   | landscape (narrow) |

To see the complete list of size classes associated with devices and viewports, see <http://www.sizeclasses.com>.

### Single-image launch screen

If your launch image is simple, you may be able to avoid creating a lot of different launch images and supply only one.
The launch image needs to meet the following requirements:

-   the image should be square
-   the image should be large enough to fit on an iPad Pro 12.9": 2732x2732
-   anything important should fit within the center

Keep in mind that the image will be cropped, possibly quite severely, depending upon the viewport.

Once the image is created, you can include it in your project by adding the following to `config.xml`:

```
    <splash src="res/ios/Default@2x~universal~anyany.png" />
```

or the following to `config/resources.json`:

```
    { "tag": "splash", "filename": "res/ios/Default@2x~universal~anyany.png", "platform": "ios" }
```

Because only one image is provided, iOS will utilize it in every context.

### Multi-image launch screen

If a single launch image won't meet your needs, you will probably need to supply at least six images, if not more.
Furthermore, keep in mind that it will not be possible to fine-tune the image to a specific device, but only to a device
class, display factor, and viewport size.

If you don't need to target images to a specific idiom, you should create six images, as follows:

| scale |   idiom   | width | height |   size    |             filename              |
| :---: | :-------: | :---: | :----: | :-------: | :-------------------------------: |
| 2x\*  | universal |  any  |  any   | 2732x2732 | `Default@2x~universal~anyany.png` |
|  2x   | universal |  com  |  any   | 1278x2732 | `Default@2x~universal~comany.png` |
|  2x   | universal |  com  |  com   | 1334x750  | `Default@2x~universal~comcom.png` |
| 3x\*  | universal |  any  |  any   | 2208x2208 | `Default@3x~universal~anyany.png` |
|  3x   | universal |  any  |  com   | 2208x1242 | `Default@3x~universal~anycom.png` |
|  3x   | universal |  com  |  any   | 1242x2208 | `Default@3x~universal~comany.png` |

\* this image is required in order for iOS utilize the other images within this scale and idiom.

> Note: If the 3x sizes look small to you, that's because there's only one device class that currently has a 3x density:
> the iPhone 6+/6s+/7+.

The above looks like the following snippet when present in `config.xml`:

```
    <splash src="res/ios/Default@2x~universal~anyany.png" />
    <splash src="res/ios/Default@2x~universal~comany.png" />
    <splash src="res/ios/Default@2x~universal~comcom.png" />
    <splash src="res/ios/Default@3x~universal~anyany.png" />
    <splash src="res/ios/Default@3x~universal~anycom.png" />
    <splash src="res/ios/Default@3x~universal~comany.png" />
```

or the following in `config/resources.json`:

```
    { "tag": "splash", "filename": "res/ios/Default@2x~universal~anyany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@2x~universal~comany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@2x~universal~comcom.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@3x~universal~anyany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@3x~universal~anycom.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@3x~universal~comany.png", "platform": "ios" }
```

Should one need to further fine-tune based upon device idiom, one can do so. This might look like so:

| scale | idiom  | width | height |   size    |            filename            |
| :---: | :----: | :---: | :----: | :-------: | :----------------------------: |
| 2x\*  | iphone |  any  |  any   | 1334x1334 | `Default@2x~iphone~anyany.png` |
|  2x   | iphone |  com  |  any   | 750x1334  | `Default@2x~iphone~comany.png` |
|  2x   | iphone |  com  |  com   | 1334x750  | `Default@2x~iphone~comcom.png` |
| 3x\*  | iphone |  any  |  any   | 2208x2208 | `Default@3x~iphone~anyany.png` |
|  3x   | iphone |  any  |  com   | 2208x1242 | `Default@3x~iphone~anycom.png` |
|  3x   | iphone |  com  |  any   | 1242x2208 | `Default@3x~iphone~comany.png` |
| 2x\*  |  ipad  |  any  |  any   | 2732x2732 |  `Default@2x~ipad~anyany.png`  |
|  2x   |  ipad  |  com  |  any   | 1278x2732 |  `Default@2x~ipad~comany.png`  |

\* this image is required in order for iOS utilize the other images within this scale and idiom.

The above looks like the following in `config.xml`:

```
    <splash src="res/ios/Default@2x~iphone~anyany.png" />
    <splash src="res/ios/Default@2x~iphone~comany.png" />
    <splash src="res/ios/Default@2x~iphone~comcom.png" />
    <splash src="res/ios/Default@3x~iphone~anyany.png" />
    <splash src="res/ios/Default@3x~iphone~anycom.png" />
    <splash src="res/ios/Default@3x~iphone~comany.png" />
    <splash src="res/ios/Default@2x~ipad~anyany.png" />
    <splash src="res/ios/Default@2x~ipad~comany.png" />
```

or the following in `config/resources.json`:

```
    { "tag": "splash", "filename": "res/ios/Default@2x~iphone~anyany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@2x~iphone~comany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@2x~iphone~comcom.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@3x~iphone~anyany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@3x~iphone~anycom.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@3x~iphone~comany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@2x~ipad~anyany.png", "platform": "ios" },
    { "tag": "splash", "filename": "res/ios/Default@2x~ipad~comany.png", "platform": "ios" }
```

<sup>1</sup> The steps outlined here have been adapted from the README of
[`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen/blob/master/README.md#launch-storyboard-images)
