[![Build Status](https://travis-ci.org/mendixlabs/signature.svg?branch=master)](https://travis-ci.org/mendixlabs/signature)
[![Dependency Status](https://david-dm.org/mendixlabs/signature.svg)](https://david-dm.org/mendixlabs/signature)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/signature.svg#info=devDependencies)](https://david-dm.org/mendixlabs/signature#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/signature/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/signature)
![badge](https://img.shields.io/badge/mendix-7.21.0-green.svg)

## Signature
A signature pad for capturing signatures.  
The widget implements bezier curves and velocity for the smooth drawing of the signature.

## Features
* Record signature in a mendix database  
* Customizable pen color and pen size 
* Toggle attribute to delete signature and reset the canvas

## Configuration
Add the widget to a dataview.

## Demo project
[https://signature101.mxapps.io](https://signature101.mxapps.io)

## Usage
* Add an entity to the domain model which should inherit from Mendix **System.image**
* Add the **Has signature** attribute to the entity, to toggle when clearing the canvas.  
![Canvas](/assets/signature-attribute.png)

* Under the pen tab, you can customize your own pen size by choosing the different pen types, the pen color.  
![Pen](/assets/signature-pen.png)

* Run the application  
* After signing on the canvas the **Has signature** attribute is toggled to show that the canvas has a signature, you can toggle to **no** inorder to clear the signature
![Data source](/assets/signature-image.png)

### Properties
* **Pen** | **color** - HTML color code of the pen.
* **Show background grid** - When set to yes, a grid is shown in the background of the writable area.
* **Cell width** - The width of a grid cell in (px).
* **Cell height** - The height of a grid cell in (px).
* **Line color** - HTML color code of the grid lines
* **Line width** - Width of grid line border in pixels
* Under the **common tab**, custom CSS Style properties can be set for responsive design, when width and height are a percentage. For example:
    - min-width: 200px;
    - max-width: 600px;
    - min-height: 200px;
    - max-height: 600px;

## Compatibility
The widget is usable and works smoothly in Google chrome, Internet explorer. 

## Development  
See [here](/development.md)
