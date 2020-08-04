## Bottom Sheet

The bottom sheet widget creates a set of options while blocking interaction with the rest of the screen or a draggable surface anchored to the bottom of the screen. There are two variations of bottom sheet widget: a modal bottom sheet and an expanding bottom sheet.

## Usage

​

### Adding Triggerer for Modal

The triggerer is only used for the modal bottom sheet variation, and requires that you select a Boolean attribute. When it turns the value to **true**, the modal will be triggered.
​

### Adding Items

There are two modes which let you add new items to the bottom sheet: basic mode and custom mode.
​

#### Basic Mode

​
Simply add new items with `Caption` and `Action` to quickly create a menu item. You can also select the desired style for each item.

**You can use the Native iOS variant in this mode.**
​

#### Custom Mode

​
Selecting **custom** mode will add a free modeling area. This area will be wrapped with `Touchable`. Any `Touchable` items (for example buttons or drop-down menus) in this field will steal the touch event which will prevent the bottom sheet from closing.​​

## Styling

​
A main object has four objects. Objects with **?** are optional and do not need to be provided in the main object.

| Style Key                                    | Description                                                                                               |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| container?: ViewStlye;                       | Styles the wrapper view around the whole expanding bottom sheet\.                                         |
| containerWhenExpandedFullscreen?: ViewStyle; | Styles the wrapper view around the whole expanding bottom sheet when full screen is enabled and reached\. |
| modal?: ViewStlye;                           | Styles the wrapper view around the modal\.                                                                |
| modalItems?: ModalItemsStyle;                | Styles the items inside according to selected style                                                       |

#### ModalItemsStyle

| Style Key                      | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| defaultStyle?: BasicItemStyle; | Styles all basic items which has "default" style selected\. |
| primaryStyle?: BasicItemStyle; | Styles all basic items which has "primary" style selected\. |
| dangerStyle?: BasicItemStyle;  | Styles all basic items which has "danger" style selected\.  |
| customStyle?: BasicItemStyle;  | Styles all basic items which has "custom" style selected\.  |

Example:

```
    export const style = {
       container: {
       		borderRadius: 10,
       		marginTop: 20,
       },
       containerWhenExpandedFullscreen: {
           background: red;
       },
       modal: {
           margin: 0,
           justifyContent: "flex-end"
       },
       modalItems: {
           defaultStyle: {
               fontSize: 16,
               color: "black"
           },
           primaryStyle: {
               fontSize: 16,
               color: "#0595DB"
           },
           dangerStyle: {
               fontSize: 16,
               color: "#ed1c24"
           },
           customStyle: {
               fontSize: 16,
               color: "#76CA02"
           }
       }
   };
```
