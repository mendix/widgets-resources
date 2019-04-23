import { contrast, background, spacing, font, deviceHeight } from '../core/variables';
import merge from '../core/_helperfunctions/mergeobjects';
import { Platform } from 'react-native';

//== Temporary Classes
//## Helper classes to create the desired look & feel
//-------------------------------------------------------------------------------------------------------------------//
// Home
export const homeImageBackground = {
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
};

export const homeImageIllustration = {
    container: {
        zIndex: 1,
        marginTop: 100,
    },
    image: {
        width: 200,
        height: deviceHeight / 2.5,
        resizeMode: 'contain',
    },
};

export const homeFooter = {
    container: {
        zIndex: 1,
        width: '100%',
        // height: '100%',
    },
};

export const homeFooterLogo = {
    container: {
        // width: '100%',
        alignSelf: 'center',
    },
    image: {
        height: 60,
        resizeMode: 'contain',
    },
};

export const homeFooterText = {
    container: {},
    text: {
        lineHeight: 25,
    },
};

// Buttons
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
        fontSize: font.size,
        ...Platform.select({
            ios: {
                color: contrast.higher,
            },
            android: {
                color: contrast.high,
            },
        }),
    },
};
export const btnListItemTop = merge(btnListItem, {
    container: {
        borderTopWidth: 1,
    },
});

export const square = {
    container: {
        aspectRatio: 1,
    },
};
