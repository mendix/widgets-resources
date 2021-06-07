import { accordion } from "../../variables";
import { AccordionType } from "../../types/widgets";
import { TextHeading1, TextHeading2, TextHeading3, TextHeading4, TextHeading5, TextHeading6 } from "./typography";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Activity Indicator

    Default Class For Mendix Activity Indicator Widget
========================================================================== */
export const com_mendix_widget_native_accordion_Accordion: AccordionType = {
    container: {
        // All ViewStyle properties are allowed
        flex: 1,
        backgroundColor: accordion.container.backgroundColor
    },
    group: {
        container: {
            // All ViewStyle properties are allowed
            flex: 1
        },
        header: {
            container: {
                // All ViewStyle properties are allowed
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: accordion.groupHeader.container.paddingVertical,
                paddingHorizontal: accordion.groupHeader.container.paddingHorizontal
            },
            heading1: {
                // All TextStyle properties are allowed
                ...TextHeading1.text,
                fontWeight: "normal",
                color: accordion.groupHeader.heading.color
            },
            heading2: {
                // All TextStyle properties are allowed
                ...TextHeading2.text,
                fontWeight: "normal",
                color: accordion.groupHeader.heading.color
            },
            heading3: {
                // All TextStyle properties are allowed
                ...TextHeading3.text,
                fontWeight: "normal",
                color: accordion.groupHeader.heading.color
            },
            heading4: {
                // All TextStyle properties are allowed
                ...TextHeading4.text,
                fontWeight: "normal",
                color: accordion.groupHeader.heading.color
            },
            heading5: {
                // All TextStyle properties are allowed
                ...TextHeading5.text,
                fontWeight: "normal",
                color: accordion.groupHeader.heading.color
            },
            heading6: {
                // All TextStyle properties are allowed
                ...TextHeading6.text,
                fontWeight: "normal",
                color: accordion.groupHeader.heading.color
            },
            icon: {
                // Size, Color and all ViewStyle properties are allowed
                size: accordion.groupHeader.icon.size,
                color: accordion.groupHeader.icon.color
            }
        },
        content: {
            // All ViewStyle properties are allowed
            paddingTop: accordion.groupContent.paddingTop,
            paddingBottom: accordion.groupContent.paddingBottom,
            paddingHorizontal: accordion.groupContent.paddingHorizontal
        }
    }
};
