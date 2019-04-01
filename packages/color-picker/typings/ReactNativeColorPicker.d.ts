declare module "react-native-color-picker" {
    import { PureComponent } from "react";
    import { StyleProp, ViewStyle } from "react-native";

    export interface HSV {
        h: number;
        s: number;
        v: number;
    }

    export interface ColorPickerProps {
        /**
         * Color string or HSV object (see below). Defines selected color in controlled component.
         */
        color?: string | HSV;

        /**
         * Defines initial selected color in uncontrolled component.
         */
        defaultColor?: string;

        /**
         * Old color to be used for visual comparision. If it is not defined, whole circle is representing selected color.
         */
        oldColor?: string;

        /**
         * Styles passed to color picker container
         */
        style?: StyleProp<ViewStyle>;

        /**
         * Callback with color (HEX string) as argument called when user confirms color selection.
         */
        onColorSelected?: (hsv: HSV) => void;

        /**
         * Callback called each time when color is changed. Used in controlled component. Argument is color in HSV representation (see below)
         */
        onColorChange?: (hsv: HSV) => void;

        /**
         * Callback with color (HEX string) as argument called when user selects old color.
         */
        onOldColorSelected?: (hsv: HSV) => void;

        /**
         * Option to hide bottom sliders (holo picker only)
         */
        hideSliders?: boolean;
    }

    export function fromHsv(hsv: HSV): string;

    export class TriangleColorPicker extends PureComponent<ColorPickerProps> {}
}
