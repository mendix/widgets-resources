import { exclude, only, Style } from "@native-mobile-resources/util-widgets";
import { Dimensions, ImageStyle, ImageURISource, Platform, TextInputProps, TextStyle, ViewStyle } from "react-native";

/**
 * Specific styles
 */

export const floatingButtonContainer: ViewStyle = {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: Dimensions.get("window").height / 2 - 100,
    zIndex: 9999
};

export const imageStyle: ImageStyle = {
    width: 30,
    height: 30,
    resizeMode: "contain",
    margin: 5
};

export const commentIcon: ImageURISource = {
    uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAMAAAC/MqoPAAAC/VBMVEUAAAAA//8Jl9kElNsGldoFlNoGldwFlNoEldsFltsFldsFldwFldsFldsFldsFldsGldsFldsFldsGltsFldsFlNsElNoFltwElNoGmNsAi9EAgL8GlNsGldsGlNsEldsFltsFldsEldsFlNsFldwEltsElN0AnNUIltoFldwFlNsFldsEldsEltsAjuMIk9gFltoFldsEldsFlNsFldsEltoAktsAqtUEldwFldwFldsFldsGldwFldwIlN4HldsFlNoFldsFlNsGldsHltgElNoFlNsFldsFldsFltwAlNcJktsFldsEldoDlNoAgP8FltwFltsFldsEltsAmcwFldoHktsFldsFldsFldsFldwFltsGldwFltwElNsGlNsFltoGldsFldsEldsFldsFlNsGk90FldsFldsGltsFlNsFlNsHldwAld8GldwEldwFldsFldsFltsEld0AktsHmN0GltsGltsEl9wFldsGlNsAl9wFk90FldoFldsGldoFltoEk9sGldsFldwGldwFldsAmeYFktkFltsAldUFldsKk9gAqv8GldsFldsFld0Gk9oFldsEltsEk9wAndgElNsFldsEk9sGldoFlNsEldoHltsAluEElNsFldsFldsFldsAktsFldsAj98FldwGlNwAmd0FldsGltoFldsAn98FlNsAmdkFldoEldsFldsGltwEldoFldsFldsFldwGldsDlN0FldsFlNsFldoFlNsFldsGk9kFldsFldwFldsFldoFltsFldsEltsAkN4Glt4FltsFldsFl9sFltsFldsGl9wFldsFldoFldsJmd0FldsGldoFlNsEltkGldsEldwGltsGlNsFldsAmdYFldsFldsEldsFldwFldwIl9cEldwGltwEldwFldsFl9kFlNoGldoFlNoFldsGlNwEldsEldwEldwFldsFldsHlN0EldsFldoFldsGltwJldwFlNsElNoGldoFldwFldsGlNsFldoDltwFlNsDltrcgeKMAAAA/3RSTlMAARs5Um6JoK+/z9/u/f/159fHuKiUfF9FKgsEK1uGq9D2472YckMSIl7J4LA/CSFoqeX5xkQHBkiR2fS0bB9NmerVgCc+nvHMbRMc3a5MAjOi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"
};

export const activityIndicatorStyle: ViewStyle = {
    marginBottom: Platform.select({ ios: 15, android: 0 })
};

export const switchContainer: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: Platform.select({ ios: 10, android: 0 })
};

/**
 * Custom styles
 */

export interface TextAreaStyleProps extends TextStyle, TextInputProps {}

interface CustomSwitchStyleProps {
    trackColorOn?: string;
    trackColorOff?: string;
    thumbColorOn?: string;
    thumbColorOff?: string;
}

interface SwitchStyleProps extends TextStyle, CustomSwitchStyleProps {}

interface ButtonStyleProps {
    borderColor: string;
    borderWidth: number;
    color: string;
}

export interface FeedbackStyle extends Style {
    floatingButton: ViewStyle;
    dialog: ViewStyle;
    title: TextStyle;
    textAreaInput: TextAreaStyleProps;
    switchLabel: TextStyle;
    switchInput: SwitchStyleProps;
    button: ButtonStyleProps;
    buttonDisabled: Partial<ButtonStyleProps>;
    activityIndicator: {
        color: string;
    };
}

export const defaultFeedbackStyle: FeedbackStyle = {
    floatingButton: {
        flexDirection: "column",
        borderRadius: 7,
        backgroundColor: "#fff",
        shadowColor: "000",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 2,
            height: 5
        },
        elevation: 2.5
    },
    dialog: {},
    title: {},
    textAreaInput: {
        fontSize: 16,
        fontFamily: Platform.select({ ios: "System", android: "normal" }),
        color: "#666",
        borderColor: "#eee",
        backgroundColor: "#FFF",
        padding: 10,
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderLeftWidth: 0,
                borderBottomWidth: 1,
                borderRightWidth: 0
            },
            android: {
                borderWidth: 1,
                borderRadius: Platform.select({ ios: 10, android: 5 })
            }
        }),
        height: 100,
        textAlignVertical: "top",
        placeholderTextColor: "#888",
        selectionColor: "#aaa",
        underlineColorAndroid: "transparent",
        numberOfLines: 5
    },
    switchLabel: {
        color: "#444",
        fontFamily: Platform.select({ ios: "System", android: "normal" }),
        fontSize: 16
    },
    switchInput: {
        margin: 0,
        padding: 0,
        marginRight: Platform.select({ ios: 0, android: -5 })
    },
    button: {
        borderColor: "#eee",
        borderWidth: 1,
        color: Platform.select({ ios: "#007ff9", default: "#169689" })
    },
    buttonDisabled: {
        color: "gray"
    },
    activityIndicator: {
        color: "#666"
    }
};

export function processStyles(styles: FeedbackStyle): any {
    const textInputStylePropsKeys: Array<keyof TextInputProps> = [
        "placeholderTextColor",
        "selectionColor",
        "underlineColorAndroid",
        "numberOfLines"
    ];
    const blurStylePropKeys: Array<keyof ViewStyle> = ["backgroundColor", "opacity"];
    const switchPropKeys: Array<keyof CustomSwitchStyleProps> = [
        "thumbColorOn",
        "thumbColorOff",
        "trackColorOn",
        "trackColorOff"
    ];
    const textareaTextPropKeys: Array<keyof TextStyle> = ["color", "fontSize", "fontFamily", "fontWeight"];

    const textAreaInputStyles = exclude<TextStyle, TextInputProps>(styles.textAreaInput, textInputStylePropsKeys);

    const textAreaInputProps = only<TextAreaStyleProps, TextInputProps>(styles.textAreaInput, textInputStylePropsKeys);

    const switchInputStyles = exclude<TextStyle, SwitchStyleProps>(styles.switchInput, switchPropKeys);

    const switchInputProps = only<SwitchStyleProps, CustomSwitchStyleProps>(styles.switchInput, switchPropKeys);

    const borderIos = Platform.select({
        ios: {
            borderTopColor: styles.button.borderColor,
            borderTopWidth: styles.button.borderWidth
        },
        android: {}
    });

    const buttonSeparatorIos = Platform.select({
        ios: { backgroundColor: styles.button.borderColor, width: styles.button.borderWidth },
        android: {}
    });

    const blurStyle = Platform.select<ViewStyle>({
        ios: only<TextAreaStyleProps, ViewStyle>(styles.dialog, blurStylePropKeys),
        android: {}
    });

    const dialogStyle = Platform.select({
        ios: exclude<TextAreaStyleProps, ViewStyle>(styles.dialog, blurStylePropKeys),
        android: styles.dialog
    });

    const descriptionStyle = only<TextAreaStyleProps, TextStyle>(styles.textAreaInput, textareaTextPropKeys);

    return {
        textAreaInputStyles,
        textAreaInputProps,
        switchInputStyles,
        switchInputProps,
        borderIos,
        buttonSeparatorIos,
        dialogStyle,
        blurStyle,
        descriptionStyle
    };
}
