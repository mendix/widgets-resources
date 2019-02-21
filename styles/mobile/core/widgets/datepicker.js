import { TextBox } from "./textbox";
import { gray, spacing, border } from "../variables";
import { Platform } from "react-native";

/* ==========================================================================
    DatePicker

    Default Class For Mendix DatePicker Widget
========================================================================== */

export const DatePicker = {
    label: TextBox.label,
    value: {
        borderColor: gray.lightest,
        backgroundColor: "#FFF",
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderBottomWidth: 1,
                padding: spacing.smaller
            },
            android: {
                borderWidth: 1,
                borderRadius: border.radius,
                padding: spacing.small
            }
        })
    }
};
