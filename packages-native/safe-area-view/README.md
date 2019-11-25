# Safe area view widget

Prevents content being rendered in unsafe areas like rounded screen corners or a notch. Currently, this widget only
supports iOS.

## Custom styling

You can define your custom styles through Atlas. These styles should adhere to the following interface:

```ts
interface SafeAreaViewStyle {
    unsafeAreaTop?: {
        backgroundColor?: string;
    };
    unsafeAreaBottom?: {
        backgroundColor?: string;
    };
    container?: ViewStyle;
}
```

An example of a default custom style class:

```js
export const com_mendix_widget_native_safeareaview_SafeAreaView = {
    unsafeAreaTop: {
        backgroundColor: "#FFF"
    },
    unsafeAreaBottom: {
        backgroundColor: "#FFF"
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
};
```

An example of a custom style class:

```js
export const transparentUnsafeArea = {
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
};
```

Check the official documentation for further information about ViewStyle :
`https://facebook.github.io/react-native/docs/view-style-props`
