declare module "react-native-dialog" {
    import { PureComponent, ReactNode, Ref } from "react";
    import { StyleProp, TextInputProps, TextProps, ViewProps, ViewStyle } from "react-native";

    interface ButtonProps {
        label: string;
        /**
         * default:
         *      ios     #007ff9
         *      android #169689
         */
        color?: string;
        bold?: boolean;
        /**
         * default: false
         */

        disabled?: boolean;
        onPress: () => void;
    }

    interface ContainerProps {
        blurComponentIOS?: ReactNode;
        children: React.ReactNode[];
        /**
         * default: false
         */
        visible?: boolean;
        buttonSeparatorStyle?: ViewStyle;
        contentStyle?: ViewStyle;
        footerStyle?: ViewStyle;
        headerStyle?: ViewStyle;
    }

    interface TitleProps {
        children: string;
    }

    interface InputProps<T> {
        label?: string;
        textInputRef?: Ref<T>;
        wrapperStyle?: StyleProp<ViewStyle>;
    }

    interface DescriptionProps {
        children: string;
    }

    // tslint:disable:max-classes-per-file

    class Button extends PureComponent<ButtonProps & ViewProps & TextProps> {}

    class Container extends PureComponent<ContainerProps & ViewProps> {}

    class Title extends PureComponent<TitleProps & ViewProps & TextProps> {}

    class Input<T> extends PureComponent<InputProps<T> & ViewProps & TextInputProps> {}

    class Description extends PureComponent<DescriptionProps & ViewProps & TextProps> {}

    export default {
        Button,
        Container,
        Title,
        Input,
        Description
    };
}
