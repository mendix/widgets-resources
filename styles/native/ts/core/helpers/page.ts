/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Page

    Default Class For Mendix Page
========================================================================== */
export const pageHeaderBorderNone = {
    sidebar: {
        // All ViewStyle properties are allowed
    },
    statusBar: {
        // Only backgroundColor and barStyle are allowed
    },
    header: {
        container: {
            // All ViewStyle properties are allowed
            elevation: 0,
            borderBottomWidth: undefined,
        },
        title: {
            // All TextStyle properties are allowed
        },
        backButtonText: {
            // All TextStyle properties are allowed
        },
        backButtonIcon: {
            // All ImageStyle properties are allowed
        },
    },
    container: {
        // All ViewStyle properties are allowed
    },
};
