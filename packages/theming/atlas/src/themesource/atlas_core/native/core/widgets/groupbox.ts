import { groupbox } from "../../variables";
import { GroupBoxType } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Group Box

    Default Class For Mendix Group Box Widget
========================================================================== */
export const com_mendix_widget_native_groupbox_GroupBox: GroupBoxType = {
    container: {
        // All ViewStyle properties are allowed
        borderWidth: groupbox.container.borderWidth,
        borderColor: groupbox.container.borderColor,
        borderRadius: groupbox.container.borderRadius,
        overflow: "hidden"
    },
    header: {
        container: {
            // All ViewStyle properties are allowed
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: groupbox.header.container.backgroundColor,
            paddingHorizontal: groupbox.header.container.paddingHorizontal,
            paddingVertical: groupbox.header.container.paddingVertical
        },
        content: {
            // All ViewStyle properties are allowed
            flex: 1
        },
        icon: {
            // Size, Color and all ViewStyle properties are allowed
            size: groupbox.header.icon.size,
            color: groupbox.header.icon.color,
        }
    },
    content: {
        // All ViewStyle properties are allowed
        paddingHorizontal: groupbox.content.paddingHorizontal,
        paddingVertical: groupbox.content.paddingVertical
    }
};
