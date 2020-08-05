## Pop-up Menu

​
Use Pop-up menu to create a menu which is anchored to an element. The Pop-up menu will be opened after clicking on the anchor element, and will close when one of the items are clicked.
​

## Usage

​

### Adding Triggerer

​
Simply fill the content of the triggerer. This is a free modeling content area.
​

### Adding Menu Items

​
For the sake of simplicity, there are two modes available to add new items to Pop-up menu:
​

#### Basic Mode

​
Simply add new items with `Caption` and `Action` to quickly create a drop-down item. Selecting `divider` will add a divider with straight line.
​

#### Custom Mode

​
Every item which has the **custom** mode selected will add a free modeling area. Every item will be wrapped by a `Touchable`. Any `Touchable` items (for example buttons or drop-down menus) in this field will steal the touch event which will prevent the Pop-up Menu from closing.
​
You can use this mode to achieve a tooltip-like behavior.
​

## Styling

​Please refer to https://docs.mendix.com/refguide/native-styling-refguide#11-23-popup-menu
