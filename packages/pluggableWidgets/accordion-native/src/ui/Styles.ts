import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle, TextStyle } from "react-native";

export interface AccordionStyle extends Style {
    container: ViewStyle;
    group: AccordionGroupStyle;
}

export interface AccordionGroupStyle {
    container: ViewStyle;
    header: {
        container: ViewStyle;
        heading1: TextStyle;
        heading2: TextStyle;
        heading3: TextStyle;
        heading4: TextStyle;
        heading5: TextStyle;
        heading6: TextStyle;
        icon: AccordionIconStyle;
    };
    content: ViewStyle;
}

export interface AccordionIconStyle extends ViewStyle {
    size: number;
    color: string;
}

export const defaultAccordionStyle: AccordionStyle = {
    container: {
        flexGrow: 1,
        backgroundColor: "#FFF",
        borderColor: "#CED0D3"
    },
    group: {
        container: {
            borderWidth: 1,
            borderColor: "#CED0D3"
        },
        header: {
            container: {
                borderColor: "#CED0D3",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 16,
                paddingHorizontal: 16
            },
            heading1: {
                color: "#0A1326",
                fontWeight: "600",
                fontSize: 40,
                lineHeight: 60
            },
            heading2: {
                color: "#0A1326",
                fontWeight: "600",
                fontSize: 34,
                lineHeight: 51
            },
            heading3: {
                color: "#0A1326",
                fontWeight: "600",
                fontSize: 28,
                lineHeight: 42
            },
            heading4: {
                color: "#0A1326",
                fontWeight: "600",
                fontSize: 24,
                lineHeight: 36
            },
            heading5: {
                color: "#0A1326",
                fontWeight: "600",
                fontSize: 20,
                lineHeight: 30
            },
            heading6: {
                color: "#0A1326",
                fontWeight: "600",
                fontSize: 16,
                lineHeight: 24
            },
            icon: {
                height: 16,
                width: 16,
                size: 16,
                color: "#0A1326"
            }
        },
        content: {
            paddingTop: 8,
            paddingBottom: 24,
            paddingHorizontal: 16
        }
    }
};
