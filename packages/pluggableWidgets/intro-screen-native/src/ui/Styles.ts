import { Style } from "@mendix/piw-native-utils-internal";
import { I18nManager, Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import absoluteFillObject = StyleSheet.absoluteFillObject;
import DeviceInfo from "react-native-device-info";

const isiPhoneModelWithNotch = (): boolean => {
    const model = DeviceInfo.getDeviceId();
    if (model.indexOf("iPhone") !== -1) {
        switch (model) {
            case "iPhone10,6": // iPhone X GSM
            case "iPhone11,2": // iPhone XS
            case "iPhone11,4": // iPhone XS Max
            case "iPhone11,6": // iPhone XS Max Global
            case "iPhone11,8": // Iphone XR
            case "iPhone12,1": // Iphone 11
            case "iPhone12,3": // Iphone 11 Pro
            case "iPhone12,5": // Iphone 11 Pro Max
                return true;
            default:
                return false;
        }
    }
    return false;
};

const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";
const isIphoneWithNotch = DeviceInfo.hasNotch() || (Platform.OS === "ios" && isiPhoneModelWithNotch());

const defaultButtonBetweenContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    alignSelf: "stretch"
};

const defaultButtonBelowContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12
};

const defaultButtonCaption: TextStyle = {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 18,
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
        bottom: isIphoneWithNotch ? 22 : 0,
        left: 0,
        right: 0,
        justifyContent: "space-between",
        alignItems: "center"
    },
    paginationText: {
        fontSize: 12,
        color: "black"
    },
    paginationAbove: {
        buttonsContainer: {
            flex: 1,
            flexDirection: isAndroidRTL ? "row-reverse" : "row",
            justifyContent: "center",
            marginTop: 16
        },
        buttonSkip: {
            container: {
                ...defaultButtonBelowContainer
            },
            caption: {
                ...defaultButtonCaption,
                paddingHorizontal: 5
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
                ...defaultButtonCaption,
                paddingHorizontal: 5
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
                ...defaultButtonCaption,
                paddingHorizontal: 5
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
                ...defaultButtonCaption,
                paddingHorizontal: 5
            },
            icon: {
                color: "black"
            }
        }
    },
    paginationBetween: {
        buttonSkip: {
            container: {
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption,
                paddingHorizontal: 5
            },
            icon: {
                color: "black"
            }
        },
        buttonDone: {
            container: {
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption,
                paddingHorizontal: 5
            },
            icon: {
                color: "black"
            }
        },
        buttonPrevious: {
            container: {
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption,
                paddingHorizontal: 5
            },
            icon: {
                color: "black"
            }
        },
        buttonNext: {
            container: {
                ...defaultButtonBetweenContainer
            },
            caption: {
                ...defaultButtonCaption,
                paddingHorizontal: 5
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
