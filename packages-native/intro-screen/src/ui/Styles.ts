import { Style } from "@native-mobile-resources/util-widgets";
import { I18nManager, Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import absoluteFillObject = StyleSheet.absoluteFillObject;
import DeviceInfo from "react-native-device-info";

const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";
const isIphoneWithNotch = Platform.OS === "ios" && DeviceInfo.hasNotch();

const defaultButtonBetweenContainer: ViewStyle = {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
};

const defaultButtonBelowContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
};

const defaultButtonCaption: TextStyle = {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 18,
    padding: 12,
    alignSelf: "center"
};

export interface ButtonStyle {
    container: ViewStyle;
    caption: TextStyle;
    icon: {
        color: string;
        size?: number;
    };
}

export interface IntroScreenStyle extends Style {
    fullscreenContainer: ViewStyle;
    popupContainer: ViewStyle;
    paginationContainer: ViewStyle;
    paginationText: TextStyle;
    dotStyle: ViewStyle;
    activeDotStyle: ViewStyle;
    paginationAbove: {
        buttonsContainer: ViewStyle;
        buttonSkip: ButtonStyle;
        buttonDone: ButtonStyle;
        buttonPrevious: ButtonStyle;
        buttonNext: ButtonStyle;
    };
    paginationBetween: {
        buttonSkip: ButtonStyle;
        buttonDone: ButtonStyle;
        buttonPrevious: ButtonStyle;
        buttonNext: ButtonStyle;
    };
}

export const defaultWelcomeScreenStyle: IntroScreenStyle = {
    fullscreenContainer: {
        ...absoluteFillObject
    },
    popupContainer: {
        ...absoluteFillObject,
        paddingHorizontal: 50,
        paddingVertical: 150,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    paginationContainer: {
        position: "absolute",
        bottom: 16 + (isIphoneWithNotch ? 34 : 0),
        left: 16,
        right: 16
    },
    paginationText: {
        fontSize: 12,
        color: "black"
    },
    paginationAbove: {
        buttonsContainer: {
            flex: 1,
            flexDirection: isAndroidRTL ? "row-reverse" : "row",
            alignItems: "stretch",
            justifyContent: "center"
        },
        buttonSkip: {
            container: {
                ...defaultButtonBelowContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        },
        buttonDone: {
            container: {
                ...defaultButtonBelowContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        },
        buttonPrevious: {
            container: {
                ...defaultButtonBelowContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        },
        buttonNext: {
            container: {
                ...defaultButtonBelowContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        }
    },
    paginationBetween: {
        buttonSkip: {
            container: {
                left: 0,
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        },
        buttonDone: {
            container: {
                right: 0,
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        },
        buttonPrevious: {
            container: {
                left: 0,
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        },
        buttonNext: {
            container: {
                right: 0,
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption
            },
            icon: {
                color: "black"
            }
        }
    },
    dotStyle: {
        backgroundColor: "rgba(0, 0, 0, .2)"
    },
    activeDotStyle: {
        backgroundColor: "rgba(255, 255, 255, .9)"
    }
};
