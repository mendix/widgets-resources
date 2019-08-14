# Image viewer

Display an image and optional perform an action on click: mobile friendly enlarge, open a page or call a mircoflow.

## Features

-   Supports different data sources:
    -   Set static image in the Modeler
    -   Retrieve images from a static URL
    -   Image from a URL attribute of context object
    -   Image from mendix System.Images
-   Supports actions:
    -   Enlarge and pinch zoom
    -   Open page
    -   Call microflow
    -   Call nanoflow

## Dependencies

Mendix 7.13.1

## Demo project

https://imageviewer.mxapps.io/

## Usage

The widget requires a context.

### Data source: Dynamic image

-   On the Data source option of the Data source tab, select the dynamic image.
-   The widget will pick the image from the context object (context object should inherit from system.image entity).
-   Refer to the appearance section for configuring height and width.

### Data source: Dynamic URL attribute

-   On the Data source option of the Data source tab, select the dynamic URL option if its not already selected by
    default.
-   Select the attribute from the context object that contains the URL of the image.
-   Refer to the appearance section for configuring height and width.

### Data source: Static URL

-   On the Data source option of the Data source tab, select the static URL
-   Specify the URL that points to the image (URL outside of the Mendix system).
-   Refer to the appearance section for configuring height and width.

### Data source: Static image

-   On the Data source option of the Data source tab, select the static image.
-   Click select button to add static images from the modeller.
-   Refer to the appearance section for configuring height and width.
