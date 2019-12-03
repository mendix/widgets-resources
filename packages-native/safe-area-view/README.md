# Safe area view widget

The safe area view widget prevents content from being rendered in unsafe areas like behind rounded screen corners or
notches. Currently this widget only supports iOS.

## Usage

Place the safe area view widget onto a fullscreen page and place other widgets inside its content area.

### Custom styling

The style of the safe area is fully customizable. Apply custom styles by defining custom style classes through Atlas.
These classes should adhere to the following interface:

```ts
interface SafeAreaViewStyle {
    container?: ViewStyle;
}
```

An example of a default custom style class:

```js
export const com_mendix_widget_native_safeareaview_SafeAreaView = {
    container: {
        backgroundColor: "orange"
    }
};
```

An example of a custom style class:

```js
export const customSafeAreaViewBackground = {
    container: {
        backgroundColor: "orange"
    }
};
```

Both classes will apply an orange background to the safe area.

Check the official documentation for further information about ViewStyle:
`https://facebook.github.io/react-native/docs/view-style-props`
