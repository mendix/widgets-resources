## Pop-Up Menu

​
Use pop-up menu to create a menu which is anchored to an element. The pop-up menu will be opened after clicking on the anchor element, and will close when one of the items are clicked.
​

## Usage

​

### Adding Triggerer

​
Simply fill the content of the triggerer. This is a free modeling content area.
​

### Adding Menu Items

​
For the sake of simplicity, there are two modes available to add new items to pop-up menu:
​

#### Basic Mode

​
Simply add new items with `Caption` and `Action` to quickly create a drop-down item. Selecting `divider` will add a divider with straight line.
​

#### Custom Mode

​
Every item which has the **custom** mode selected will add a free modeling area. Every item will be wrapped by a `Touchable`. Any `touchable` items (for example buttons or drop-down menus) in this field will steal the touch event which will prevent the pop-up Menu from closing.
​
You can use this mode to achieve a tooltip-like behavior.
​

## Styling

​
A main object has four objects. Objects with **?** are optional and do not need to be provided in the main object.

| Style Key                    | Description                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| basic?: BasicItemStyle;      | Styles items\.                                                                                                   |
| buttonContainer?: ViewStyle; | Styles the wrapper view of triggerer since there could be multiple elements and it has to be wrapped in a view\. |
| container?: ViewStlye;       | Styles the wrapper view around the whole menu\.                                                                  |

#### BasicItemStyle

| Style Key                   | Description                                      |
| --------------------------- | ------------------------------------------------ |
| containerStyle?: ViewStyle; | Styles the wrapper container around basic item\. |
| itemStyle?: ItemStyle;      | Styles the basic items\.                         |
| dividerColor?: string;      | Styles the divider color                         |

#### ItemStyle

| Style Key                                     | Description                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| ellipsizeMode?: TextProps\["ellipsizeMode"\]; | Styles how the text will be clipped if its too long\. Can be 'head', 'middle', 'tail' and 'clip' |
| defaultStyle?: BasicItemStyle;                | Styles all basic menu items which has "default" style selected\.                                 |
| primaryStyle?: BasicItemStyle;                | Styles all basic menu items which has "primary" style selected\.                                 |
| dangerStyle?: BasicItemStyle;                 | Styles all basic menu items which has "danger" style selected\.                                  |
| customStyle?: BasicItemStyle;                 | Styles all basic menu items which has "custom" style selected\.                                  |

Example:

```
    export const style = {
       container: {
       		borderRadius: 10,
       		marginTop: 20,
       },
       basic: {
           itemStyle: {
               defaultStyle: {
                   paddingHorizontal: 20,
               },
               dangerStyle: {
                   color: "#ed1c24"
               }
           },
           containerStyle: {
               height: 40,
           }
       },
       butonContainer: {
          width: 25,
          padding: 5,
       }
   };
```
