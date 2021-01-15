import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle, TextStyle } from "react-native";

interface ButtonContainerType extends ViewStyle {
    rippleColor?: string;
    activeOpacity?: number;
    underlayColor?: string;
}

export interface SignatureStyle extends Style {
    container: ViewStyle & {
        penColor?: string;
        backgroundColor?: string;
    };
    buttonWrapper: ViewStyle;
    buttonClearContainer: ButtonContainerType;
    buttonSaveContainer: ButtonContainerType;
    buttonClearCaption: TextStyle;
    buttonSaveCaption: TextStyle;
}

const buttonContainer: ButtonContainerType = {
    // rippleColor, underlayColor, activeOpacity and all ViewStyle properties are allowed
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8
};

export const defaultSignatureStyle: SignatureStyle = {
    container: {
        // penColor and all ViewStyle properties are allowed
        penColor: "black",
        backgroundColor: "white"
    },
    buttonWrapper: {
        // All ViewStyle properties are allowed
        flexDirection: "row",
        paddingTop: 16
    },
    buttonClearContainer: {
        // rippleColor, underlayColor, activeOpacity and all ViewStyle properties are allowed
        ...buttonContainer,
        borderColor: "#0595DB",
        backgroundColor: "transparent",
        marginRight: 8
    },
    buttonSaveContainer: {
        // rippleColor, underlayColor, activeOpacity and all ViewStyle properties are allowed
        ...buttonContainer,
        borderColor: "#0595DB",
        backgroundColor: "#0595DB",
        marginLeft: 8
    },
    buttonClearCaption: {
        // All TextStyle properties are allowed
        color: "#0595DB",
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "bold"
    },
    buttonSaveCaption: {
        // All TextStyle properties are allowed
        color: "#FFF",
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "bold"
    }
};

export const webStyles = `
    .m-signature-pad {
        border: none;
    }
    .m-signature-pad--body {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: none;
    }
    .m-signature-pad--body canvas {
        border-radius: 0;
        box-shadow: none;
    }
    .m-signature-pad--footer {
        display: none;
    }
`;
