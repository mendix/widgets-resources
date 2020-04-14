## PopupMenu

Use pop up menu to create a menus which anchored to an element. Pop up menu will be opened after pressing to the anchor element and close when one of the items are clicked.

## Usage

### Adding triggerer

Simply fill the content of the triggerer. This is a free modeling content and will be wrapped by touchable. **Any touchable items (buttons, dropdowns etc..) in this field will steal the touch event and it will prevent popup menu to open.**

### Adding menu items

For the sake of simplicity, there are two modes available to add new items to popup menu:

#### Simple mode

Simply add new item with Caption and Action to quickly create a dropdown item. Selecting divider will add a divider with straight line.

#### Custom mode

For every item which has the custom mode selected, will add a free modeling area. Every item will be wrapped by a Touchable. **Any touchable items (buttons, dropdowns etc..) in this field will steal the touch event and it will prevent popup menu to close**.

If you wish to achieve tooltip like behaviour this can be best achieved by this mode.

## Styling

Main object have four objects.

| Style Key                       | Description                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| basicItem?: BasicItemStyle;     | Styles basic items\.                                                                                             |
| complexItem?: ComplexItemStyle; | Styles custom item types\.                                                                                       |
| buttonContainer?: ViewStyle;    | Styles the wrapper view of triggerer since there could be multiple elements and it has to be wrapped in a view\. |
| buttonUnderlayColor?: string;   | \(Only in IOS\)\. Styles the background color of the triggerer which will be revealed when user taps on it \.    |

#### BasicItemStyle

| Style Key                                     | Description                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| container?: ViewStyle;                        | Styles the wrapper container\.                                                                                |
| textStyle?: TextStyle;                        | Styles the caption\.                                                                                          |
| ellipsizeMode?: TextProps\["ellipsizeMode"\]; | Styles how the text will be clipped if its too long\. Can be 'head', 'middle', 'tail' and 'clip'              |
| dividerColor?: string;                        | Styles the divider color                                                                                      |
| underlayColor?: string;                       | \(Only in IOS\)\. Styles the background color of the menu item which will be revealed when user taps on it \. |

#### ComplexItemStyle

| Style Key               | Description                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| container?: ViewStyle;  | Styles the wrapper container\.                                                                               |
| underlayColor?: string; | \(Only in IOS\)\. Styles the background color of the menu item which will be reveled when user taps on it \. |

Example:

```
    export const stle = {
       basicItem: {
           underlayColor: "#e0e0e0",
           dividerColor: "green",
           textStyle: {
               color: "red"
           }
       },
       complexItem: {
           underlayColor: "#e0e0e0",
           container: {
               backgroundColor: "yellow",
               height: 48,
               justifyContent: "center",
               maxWidth: 248,
               minWidth: 124
           }
       },
       buttonUnderlayColor: "#e0e0e0"
   };
```
