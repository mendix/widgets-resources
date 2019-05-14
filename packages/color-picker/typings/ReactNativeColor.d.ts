declare module "react-native-color" {
    import HSL = tinycolor.ColorFormats.HSL;
    import { ViewStyle } from "react-native";

    export interface ColorPickerProps {
        gradientSteps: number;
        maximumValue?: number;
        color?: HSL;
        getStepColor?: (i: number) => string;
        style?: ViewStyle;
    }

    export const Gradient: (props: ColorPickerProps) => JSX.Element;
    export const HueGradient: (props: ColorPickerProps) => JSX.Element;
    export const LightnessGradient: (props: ColorPickerProps) => JSX.Element;
    export const SaturationGradient: (props: ColorPickerProps) => JSX.Element;
}
