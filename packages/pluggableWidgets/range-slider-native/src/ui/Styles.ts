import { Style } from "@mendix/piw-native-utils-internal";
import { Platform, TextStyle, ViewStyle } from "react-native";

export interface RangeSliderStyle extends Style {
    container: ViewStyle;
    track: ViewStyle;
    trackDisabled: ViewStyle;
    highlight: ViewStyle;
    highlightDisabled: ViewStyle;
    marker: ViewStyle;
    markerActive: ViewStyle;
    markerDisabled: ViewStyle;
    validationMessage: TextStyle;
}

const blue = "rgb(0,122,255)";
const blueLighter = "rgba(0,122,255,0.3)";
const purple = "rgb(98,0,238)";
const purpleLighter = "rgba(98,0,238, 0.3)";
const purpleLightest = "rgba(98,0,238, 0.1)";

export const defaultRangeSliderStyle: RangeSliderStyle = {
    container: {},
    track: {
        backgroundColor: Platform.select({ ios: blueLighter, android: purpleLighter })
    },
    trackDisabled: {
        ...Platform.select({
            ios: {
                opacity: 0.4,
                backgroundColor: blueLighter
            },
            android: {
                backgroundColor: "#EEE"
            }
        })
    },
    highlight: {
        backgroundColor: Platform.select({ ios: blue, android: purple })
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: blue, android: "#AAA" })
    },
    marker: {
        ...Platform.select({
            android: {
                borderColor: purple,
                backgroundColor: purple
            }
        })
    },
    markerDisabled: {
        ...Platform.select({
            ios: {
                backgroundColor: "#FFF",
                shadowOpacity: 0.1,
                borderColor: "rgba(221,221,221,0.6)"
            },
            android: {
                elevation: 0,
                backgroundColor: "#AAA"
            }
        })
    },
    markerActive: {
        ...Platform.select({
            android: {
                borderWidth: 5,
                borderColor: purpleLightest
            }
        })
    },
    validationMessage: {
        color: "#ed1c24"
    }
};
