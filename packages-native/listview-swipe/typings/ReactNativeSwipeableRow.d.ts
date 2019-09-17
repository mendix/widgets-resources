declare module "react-native-swipeable-row" {
    import { ReactNode } from "react";
    import { ViewStyle } from "react-native";

    export interface SwipeableProps {
        children: ReactNode;
        /**
         * Left content visible during pull action
         */
        leftContent?: ReactNode;
        /**
         * Right content visible during pull action
         */
        rightContent?: ReactNode;
        /**
         * Array of buttons, first being the innermost; ignored if leftContent present
         */
        leftButtons?: ReactNode[];
        /**
         * Array of buttons, first being the innermost; ignored if rightContent present
         */
        rightButtons?: ReactNode[];
        /**
         * Minimum swipe distance to activate left action
         */
        leftActionActivationDistance?: number;
        /**
         * User has swiped beyond leftActionActivationDistance and released
         */
        onLeftActionRelease?: () => void;
        /**
         * Minimum swipe distance to activate right action
         */
        rightActionActivationDistance?: number;
        /**
         * User has swiped beyond rightActionActivationDistance and released
         */
        onRightActionRelease?: () => void;
        /**
         * Resting visible peek of each left button after buttons are swiped ope
         */
        leftButtonWidth?: number;
        /**
         * Resting visible peek of each right button after buttons are swiped open
         */
        rightButtonWidth?: number;
        /**
         * To alert the user that swiping is possible
         */
        bounceOnMount?: boolean;
        /**
         * Disable swiping
         */
        disable?: boolean;
        style?: ViewStyle;
        leftContainerStyle?: ViewStyle;
        leftButtonContainerStyle?: ViewStyle;
        rightContainerStyle?: ViewStyle;
        rightButtonContainerStyle?: ViewStyle;
        contentContainerStyle?: ViewStyle;

        onRef?: (ref: Swipeable) => void;
        onSwipeStart?: () => void;
        onSwipeMove?: () => void;
        onSwipeRelease?: () => void;
        onSwipeComplete?: () => void;
    }

    const Swipeable: (props: SwipeableProps) => JSX.Element;
    export default Swipeable;
}
