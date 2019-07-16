import { background, border, contrast, font, spacing } from '../../../core/variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Cards

========================================================================== */

export const cardShadow = {
    container: {
        elevation: 1.5,
        shadowColor: contrast.lower,
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
};

export const card = {
    container: {
        borderRadius: border.radius,
        backgroundColor: background.primary,

        // alignItems: 'center',
        // paddingHorizontal: spacing.large,
        // paddingVertical: spacing.large,
        // paddingTop: spacing.regular,
        // paddingBottom: spacing.large,
        // marginHorizontal: spacing.regular,
        marginBottom: spacing.regular,

        ...Platform.select({
            android: {
                borderWidth: 1,
                borderColor: contrast.lowest,
            },
        }),
        ...cardShadow.container,
    },
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

export const cardTitle = {
    container: {
        marginHorizontal: spacing.small,
        fontSize: font.sizeLarge,
        marginBottom: spacing.large,
    },
    text: {
        color: contrast.high,
    },
};

export const cardImage = {
    container: {
        flex: -1,
        // height: 'auto',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    },
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//

export const cardAction = {
    container: {
        flex: 1,
        flexBasis: '40%',
        aspectRatio: 1,
        padding: spacing.regular,
        borderWidth: 1,
        borderColor: border.color,
        borderRadius: border.radius,
    },
};

export const cardActionImage = {
    image: {
        maxHeight: 70,
        resizeMode: 'contain',
    },
};

//==========================================================================================\\

export const cardForm = {
    container: {
        borderRadius: border.radius,
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.larger,
        backgroundColor: background.primary,
        ...cardShadow.container,
    },
};

//==========================================================================================\\

export const cardProduct = {
    container: {
        borderRadius: border.radius,
        backgroundColor: background.primary,
        ...cardShadow.container,
    },
};

export const cardProductImage = {
    container: {
        overflow: 'hidden',
        borderTopLeftRadius: border.radius,
        borderTopRightRadius: border.radius,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
};
export const cardProductImageFull = {
    container: {
        ...cardProductImage.container,
        borderBottomLeftRadius: border.radius,
        borderBottomRightRadius: border.radius,
    },
    image: cardProductImage.image,
};

export const cardProductBody = {
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
};

export const cardRating = {
    container: {
        flexShrink: 1,
        justifyContent: 'flex-start',
    },
    icon: {
        size: 18,
    },
};

//==========================================================================================\\
