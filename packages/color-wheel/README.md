## Color Wheel Widget

### Styling

You can use the following objects to stylize

```
{
    container: ViewStyle;
    thumbnail: ViewStyle;
}
```

Container supports all the ViewStyle properties, thumbnail doesn`t allow to use borderRadius, backgroundColor and
opacity. If you define the width and height, width will precede height. Example:

```
 export const customColorWheel = {
    container: {
        // All ViewStyle properties are allowed
        borderWidth: 1,
        borderColor: "black",
        width: "50%",
        alignSelf: "center"
    },
    thumbnail: {
        // All ViewStyle properties are allowed
        height: 20,
        width: 20,
        borderColor: "red",
        borderWidth: 10
    }
 };
```
