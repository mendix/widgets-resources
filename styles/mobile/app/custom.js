import { contrast, background, spacing, font, brand } from '../core/variables';
import merge from '../core/_helperfunctions/mergeobjects';
import { Platform } from 'react-native';

//== Temporary Classes
//## Helper classes to create the desired look & feel
//-------------------------------------------------------------------------------------------------------------------//
// Buttons
export const cardButton = {
    //Temporary invisible button to make a card clickable
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99,
        opacity: 0,
        width: '100%',
        height: '100%',
    },
};

export const btnListItem = {
    container: {
        width: '100%',
        borderWidth: 0,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderColor: contrast.lowest,
        backgroundColor: background.primary,
        paddingHorizontal: spacing.small,
        ...Platform.select({
            ios: {
                paddingVertical: spacing.smaller,
            },
            android: {
                paddingVertical: spacing.small,
            },
        }),
    },
    icon: {
        color: contrast.higher,
    },
    caption: {
        width: '100%',
        textAlign: 'left',
        ...Platform.select({
            ios: {
                color: contrast.higher,
                fontSize: font.size,
            },
            android: {
                color: contrast.high,
                fontSize: font.sizeLarge,
            },
        }),
    },
};
export const btnListItemTop = merge(btnListItem, {
    container: {
        borderTopWidth: 1,
    },
});

// Color Wheel
export const colorWheelContainer = {
    width: 300,
    height: 300,
};

// Spacing
export const androidSpacingInnerVerticalLarge = {
    container: {
        paddingVertical: Platform.select({ ios: 0, android: spacing.large }),
    },
};
export const androidSpacingInnerHorizontalMedium = {
    container: {
        paddingHorizontal: Platform.select({ ios: 0, android: spacing.small }),
    },
};
export const androidSpacingInnerVertical = {
    container: {
        paddingVertical: Platform.select({ ios: 0, android: spacing.smallest }),
    },
};
export const spacingOuterBottomNone = {
    container: {
        marginBottom: 0,
    },
};
export const hide = {
    container: {
        display: 'none',
    },
};

export const borderTop = {
    container: {
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderColor: contrast.lowest,
            },
            android: {},
        }),
    },
};
// export const inputWrapper = {
//     container: {
//         ...Platform.select({
//             ios: {
//                 borderBottomWidth: 1,
//                 borderColor: contrast.lowest,
//                 backgroundColor: background.primary,
//             },
//             android: {
//                 marginBottom: spacing.regular,
//             },
//         }),
//     },
// };

export const homeHeaderPhone = {
    container: {
        height: 200,
        width: '100%',
        // flexGrow: 1,
        // aspectRatio: 1,
        resizeMode: 'contain',
    },
};
// export const homeHeaderLogo = {
//     height: 100,
//     flexGrow: 1,
//     aspectRatio: 1,
//     resizeMode: 'contain',
// };

export const tempBorder = {
    container: {
        borderWidth: 2,
    },
};
