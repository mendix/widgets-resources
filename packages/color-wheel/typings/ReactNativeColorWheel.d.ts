declare module "react-native-color-wheel" {
    import React, { Component } from "react";
    import { ImageURISource, StyleProp, ViewStyle } from "react-native";

    export interface HSV {
        h: number;
        s: number;
        v: number;
    }

    export interface ColorWheelProps {
        /**
         * Initial value in hex format
         * @default '#ffffff'
         */
        initialColor?: string;

        /**
         * Callback when the value is changed or moved
         */
        onColorChange?: (hsv: HSV) => void;

        /**
         * Callback on mouseup or drag event has finished
         */
        onColorChangeComplete?: (hsv: HSV) => void;

        /**
         * Width of draggable thumb
         * @default 50
         */
        thumbSize?: number;

        /**
         * Styles for the draggable thumb
         */
        thumbStyle?: StyleProp<ViewStyle>;

        /**
         * Styles for the container
         */
        style?: StyleProp<ViewStyle>;
    }

    export class ColorWheel extends Component<ColorWheelProps> {}
}
