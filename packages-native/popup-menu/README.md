## PopupMenu

Use pop up menu to create a menus which anchored to an element. Pop up menu will be opened after pressing to the anchor element and close when one of the items are clicked.

## Usage

### Adding clickable area to show menu

Simply fill the content of the clickable area. **Any touchable items (buttons, dropdowns etc..) in this field will steal the touch event and it will prevent popup menu to open.**

### Adding menu items

For the sake of simplicity, there are two modes available to add new items to popup menu:

#### Basic mode

Simply add new item with Caption and Action to quickly create a dropdown item. Selecting divider will add a divider with straight line.

#### Custom mode

For every item which has the custom mode selected, will add a free modeling area. **Any touchable items (buttons, dropdowns etc..) in this field will steal the touch event and it will prevent popup menu to close**.

If you wish to achieve tooltip like behaviour this can be best achieved by this mode.

## Styling

Main object have four objects. Objects with ?, means they are optional and doesn't need to be provided.

| Style Key                    | Description                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| itemStyle?: MenuItemsStyle;  | Styles items\.                                                                                                   |
| buttonContainer?: ViewStyle; | Styles the wrapper view of triggerer since there could be multiple elements and it has to be wrapped in a view\. |

#### MenuItemStyle

| Style Key                      | Description                                                           |
| ------------------------------ | --------------------------------------------------------------------- |
| container?: ViewStyle;         | Styles the wrapping view around items. Including the custom mode ones |
| defaultStyle?: BasicItemStyle; | Styles all basic menu items which has "default" style selected\.      |
| primaryStyle?: BasicItemStyle; | Styles all basic menu items which has "primary" style selected\.      |
| dangerStyle?: BasicItemStyle;  | Styles all basic menu items which has "danger" style selected\.       |
| customStyle?: BasicItemStyle;  | Styles all basic menu items which has "custom" style selected\.       |

#### BasicItemStyle

| Style Key                                     | Description                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| container?: ViewStyle;                        | Styles the wrapper container\.                                                                   |
| textStyle?: TextStyle;                        | Styles the caption\.                                                                             |
| ellipsizeMode?: TextProps\["ellipsizeMode"\]; | Styles how the text will be clipped if its too long\. Can be 'head', 'middle', 'tail' and 'clip' |
| dividerColor?: string;                        | Styles the divider color                                                                         |

Example:

```
    export const style = {
       basicItem: {
          defaultStyle: {
             dividerColor: "green",
             textStyle: {
                 color: "red"
             }
          }
       },
       customItem: {
           container: {
               backgroundColor: "yellow",
               height: 48,
               justifyContent: "center",
               maxWidth: 248,
               minWidth: 124
           }
       }
   };
```
