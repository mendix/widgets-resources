[![Build Status](https://travis-ci.org/mendix/maps.svg?branch=master)](https://travis-ci.org/mendix/maps)
[![Dependency Status](https://david-dm.org/mendix/maps.svg)](https://david-dm.org/mendix/maps)
[![Dev Dependency Status](https://david-dm.org/mendix/maps.svg#info=devDependencies)](https://david-dm.org/mendix/maps#info=devDependencies)
[![codecov](https://codecov.io/gh/mendix/maps/branch/master/graph/badge.svg)](https://codecov.io/gh/mendix/maps)
![badge](https://img.shields.io/badge/mendix-7.18.0-green.svg)

# Maps
* Show locations on maps

## Available map types
* Google maps
* Open street maps
* Map box
* Here maps

## Features
* Show location on a map based on coordinates
* Show list of coordinates on the map
* Data sources Context, Static, XPath or Microflow
* Support for Multiple data sources
* Addresses are not supported
* Support actions when a marker is clicked:
    * Open Page
    * Call Microflow
    * Call Nanoflow
* Customize the display of the marker. If the marker can not be found from the custom markers. The widget will use
the specified custom markers else it will use the widget bundled marker.

## Limitations
* Context and static datasource are Offline capable with Mendix data, however you still need to be online to view the map  
* Addresses are not supported for the **Maps** widget
* For all Map types except **open street maps** you need to have a token inorder to view the map. You can get the tokens from here  
[Mapbox](https://www.mapbox.com)  
[Here maps](https://www.here.com/)  
[Google maps](https://cloud.google.com/maps-platform/)
* Google maps uses [Google Maps API v3](https://developers.google.com/maps/). So the [Limitations](https://developers.google.com/maps/premium/usage-limits)
from Google apply.

## Dependencies
Mendix 7.18.0

## How it Works

* Locations are displayed based on coordinates. if there are multiple locations, the Map will center to a position in which all markers are visible
* If there is one location, the Map will center to that location
* If no locations available, a default center location of the mendix offices is provided in case default center coordinates are not specified
* If autozoom is enabled the Map will use bounds zoom otherwise it will use a custom zoom level specified
* Min Zoom level is 2 and the Maximum is 20

## Demo Project

[https://leafletmaps.mxapps.io/](https://leafletmaps.mxapps.io/)

![Running google maps widget](/assets/maps-google.png)

## Usage
- To add basic a map to your application select **new** under the **Map properties** tab
- Under the **Data source** tab Select data source **context**
- Select the **Locations entity**, **latitude** and **longitude** attributes
- Under the **Map properties** tab, select a **Map provider**
- Add Access token if **Map provider** is not **Open street**
- Run the application and add some locations
- For **Here maps** add **app ID, app code** respectively.

![Locations](/assets/maps-locations.png)
### Data source: Static
- On the **Map properties** tab, select **new** on the **locations** option
- Under **Data source** tab, Select **Static**
- On the **Static** tab add new static locations

![static](/assets/maps-static.png)

### Data source: Xpath
- On the **Map properties** tab, select **new** on the **locations** option
- Select **Database**, Add the **locations** entity
- Add the **Latitude** and **Longitude** attributes
- Add an **XPath Constraint** `Optional`

### Custom Markers
-  It is used to configure how the marker icon should be look.
- Under **locations** option on the **Map properties** tab, select the **Markers** tab 
- For the **Default** option, the widget bundled marker will be displayed
- For the **Static** option, upload a static image
- For the **System image** option, add a **system image path**, which is a reference to the locations enity. The entity selected should inherit from **System.Image** otherwise it will display an error.
- Upload an image into the database to view the **system image** marker at runtime
- Markers can also be created based on enumeration. Select the **Marker list** option, then add an enumeration containing the name and caption of the markers to your project and assign that enumeration to the `Locations entity`.  
![Markers](/assets/maps-markers.png)  
From the `Marker image list` tab, the enumeration key and image is then specified under `Images`  
![Enumeration markers](/assets/markers.png)

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at  
[https://github.com/mendix/maps/issues](https://github.com/mendix/maps/issues).

## Development
See [here](/development.md)
