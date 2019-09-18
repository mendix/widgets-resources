declare module "react-native-swipeable-row" {
    import { ReactNode } from "react";
    import { ViewStyle } from "react-native";

    export interface SwipeableProps {
        children: ReactNode;
        /**
         * Left content visible during pull action
         * @default null
         */
        leftContent?: ReactNode;
        /**
         * Right content visible during pull action
         * @default null
         */
        rightContent?: ReactNode;
        /**
         * Array of buttons, first being the innermost; ignored if leftContent present
         * @default null
         */
        leftButtons?: ReactNode[];
        /**
         * Array of buttons, first being the innermost; ignored if rightContent present
         * @default null
         */
        rightButtons?: ReactNode[];
        /**
         * Minimum swipe distance to activate left action
         * @default 125
         */
        leftActionActivationDistance?: number;
        /**
         * User has swiped beyond leftActionActivationDistance and released
         * @default null
         */
        onLeftActionRelease?: () => void;
        /**
         * Minimum swipe distance to activate right action
         * @default 125
         */
        rightActionActivationDistance?: number;
        /**
         * User has swiped beyond rightActionActivationDistance and released
         * @default null
         */
        onRightActionRelease?: () => void;
        /**
         * Resting visible peek of each left button after buttons are swiped ope
         * @default 75
         */
        leftButtonWidth?: number;
        /**
         * Resting visible peek of each right button after buttons are swiped open
         * @default 75
         */
        rightButtonWidth?: number;
        /**
         * To alert the user that swiping is possible
         * @default false
         */
        bounceOnMount?: boolean;
        /**
         * Disable swiping
         * @default null
         */
        disable?: boolean;
        style?: ViewStyle;
        leftContainerStyle?: ViewStyle;
        leftButtonContainerStyle?: ViewStyle;
        rightContainerStyle?: ViewStyle;
        rightButtonContainerStyle?: ViewStyle;
        contentContainerStyle?: ViewStyle;

        /**
         * Gets the reference to the object
         * @default null
         * @param ref
         */
        onRef?: (ref: Swipeable) => void;
        onSwipeStart?: () => void;
        onSwipeMove?: () => void;
        onSwipeRelease?: () => void;
        onSwipeComplete?: () => void;
    }

    const Swipeable: (props: SwipeableProps) => JSX.Element;
    export default Swipeable;
}
