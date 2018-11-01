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

* Add the **Has signature** attribute to toggle when clearing the canvas.  
![Canvas](/assets/signature-attribute.png)

* Under the pen tab, you can customize your own pen size by choosing the different pen types, the pen color.  
![Pen](/assets/signature-pen.png)

* Run the application  
* After signing on the canvas the **Has signature** attribute is toggled to show that the canvas has a signature, you can toggle to **no** inorder to clear the signature
![Data source](/assets/signature-image.png)

### Properties
* **Pen color** - HTML color code of the pen.
* **Show background grid** - When set to yes, a grid is shown in the background of the writable area.
* **Grid X** - The distance in pixels between gridlines in the horizontal direction.
* **Grid Y** - The distance in pixels between gridlines in the vertical direction.
* **Grid color** - HTML color code of the grid
* **Grid border width** - Width of grid line border in pixels

## Compatibility
The widget is usable and works smoothly in Google chrome, Internet explorer. 

## Development  
See [here](/development.md)
