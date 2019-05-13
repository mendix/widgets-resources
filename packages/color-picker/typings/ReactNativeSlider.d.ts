declare module "react-native-slider" {
    import { ViewStyle } from "react-native";

    export interface SliderProps {
        value: number;
        step: number;
        animateTransitions: boolean;
        animationType: string;
        thumbTouchSize: {
            width: number;
            height: number;
        };
        maximumValue: number;
        onValueChange: (value: number) => void;
        onSlidingComplete: () => void;
        minimumTrackTintColor: string;
        maximumTrackTintColor: string;
        thumbStyle: ViewStyle | ViewStyle[];
    }
    const Slider: (props: SliderProps) => JSX.Element;
    export default Slider;
}
