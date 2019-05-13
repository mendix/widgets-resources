declare module "react-native-color" {
    import HSL = tinycolor.ColorFormats.HSL;

    export interface ColorPickerProps {
        gradientSteps: number;
        manixumValue?: number;
        color?: HSL;
    }

    export const HueGradient: (props: ColorPickerProps) => JSX.Element;
    export const LightnessGradient: (props: ColorPickerProps) => JSX.Element;
    export const SaturationGradient: (props: ColorPickerProps) => JSX.Element;
}
