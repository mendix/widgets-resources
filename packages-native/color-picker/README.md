## Color Picker Widget

### Styling

You can use the following objects to stylize:

```
{
    container: ViewStyle;
    thumbnail: ViewStyle & { size: number; };
}
```

Container supports all the ViewStyle properties, thumbnail has a custom property `size` and ignores width, height,
borderRadius, backgroundColor and opacity. Example:

```
 export const customColorPicker = {
    container: {
        // All ViewStyle properties are allowed
        borderWidth: 1,
        borderColor: "black",
        width: "50%",
        alignSelf: "center"
    },
    thumbnail: {
        size: 50,
        // All ViewStyle properties are allowed
        borderColor: "red",
        borderWidth: 10
    }
 };
```
