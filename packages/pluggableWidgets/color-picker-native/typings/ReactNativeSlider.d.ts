declare module "react-native-slider" {
    import { ViewStyle } from "react-native";

    export interface SliderProps {
        /**
         * Value of the slider. Default 0
         */
        value?: number;
        /**
         * Disables the slider. Default false
         */
        disabled?: boolean;
        /**
         * Ste value of the slider. Default 0
         */
        step?: number;
        /**
         * Animates the transitions. Default false
         */
        animateTransitions?: boolean;
        /**
         * Animation type, default: spring
         */
        animationType?: "spring" | "timing";
        /**
         * Size of touchable area. Default 40x40
         */
        thumbTouchSize?: {
            width: number;
            height: number;
        };
        /**
         * Initial minimum value. Default 0
         */
        minimumValue?: number;
        /**
         * Initial maximum value. Default 1
         */
        maximumValue?: number;
        /**
         * Callback continuously called while the user is dragging the slider
         * @param value
         */
        onValueChange?: (value: number) => void;
        /**
         * Callback called when the user starts changing the value
         */
        onSlidingStart?: () => void;
        /**
         * Callback called when the user finishes changing the value
         */
        onSlidingComplete?: () => void;
        /**
         * The color used for the track to the left of the button
         */
        minimumTrackTintColor?: string;
        /**
         * The color used for the track to the right of the button
         */
        maximumTrackTintColor?: string;
        /**
         * Style of the container
         */
        style?: ViewStyle | ViewStyle[];
        /**
         * Style of track
         */
        trackStyle?: ViewStyle | ViewStyle[];
        /**
         * Style of handlers
         */
        thumbStyle?: ViewStyle | ViewStyle[];
    }
    const Slider: (props: SliderProps) => JSX.Element;
    export default Slider;
}
