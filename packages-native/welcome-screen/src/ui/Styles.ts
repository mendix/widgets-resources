import { Style } from "@native-mobile-resources/util-widgets";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import absoluteFillObject = StyleSheet.absoluteFillObject;

export interface WelcomeScreenStyle extends Style {
    fullscreenContainer: ViewStyle;
    cardContainer: ViewStyle;
    /**
     * Styles for bottom buttons
     */
    bottomButtonsContainer: ViewStyle;
    buttonSkip: ViewStyle;
    buttonDone: ViewStyle;
    buttonPrev: ViewStyle;
    buttonNext: ViewStyle;
    /**
     * Style for both texts
     */
    buttonText: TextStyle;
    /**
     * Styles for normal left/right button aligned to the pagination
     */
    leftButton: ViewStyle;
    rightButton: ViewStyle;
    /**
     * Styles for pagination
     */
    paginationContainer: ViewStyle;
    paginationDots: ViewStyle;
    dotStyle: ViewStyle;
    activeDotStyle: ViewStyle;
}

export const defaultWelcomeScreenStyle: WelcomeScreenStyle = {
    fullscreenContainer: {
        ...absoluteFillObject
    },
    cardContainer: {
        ...absoluteFillObject,
        padding: 50,
        borderWidth: 1,
        borderRadius: 10
    },
    bottomButtonsContainer: {},
    buttonSkip: {},
    buttonDone: {},
    buttonPrev: {},
    buttonNext: {},
    buttonText: {
        backgroundColor: "transparent",
        color: "white",
        fontSize: 18,
        padding: 12,
        alignSelf: "center"
    },
    leftButton: {
        position: "absolute",
        left: 0
    },
    rightButton: {
        position: "absolute",
        right: 0
    },
    paginationContainer: {},
    paginationDots: {},
    dotStyle: {},
    activeDotStyle: {}
};
