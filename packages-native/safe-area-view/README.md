# Safe area view widget

Prevents content being rendered in unsafe areas like rounded screen corners or a notch. Currently this widget only
supports iOS.

## Usage

Place the Safe are view widget onto an empty page, place other widgets inside its content area and apply a custom style
class to the page to give the unsafe areas a specific background color. To achieve the same result, the widget could
also be placed inside a container that has a background color applied to it via a design property.

## Custom styling

You can define your custom styles through Atlas. These styles should adhere to the following interface:

```ts
interface SafeAreaViewStyle {
    container?: ViewStyle;
}
```

An example of a default custom style class:

```js
export const com_mendix_widget_native_safeareaview_SafeAreaView = {
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
};
```

An example of a custom style class:

```js
export const customSafeAreaViewBackground = {
    container: {
        backgroundColor: "blue"
    }
};
```

Check the official documentation for further information about ViewStyle :
`https://facebook.github.io/react-native/docs/view-style-props`
