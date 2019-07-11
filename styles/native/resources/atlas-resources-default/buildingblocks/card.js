import { background, border, contrast, font, spacing } from '../../../core/variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Cards

========================================================================== */
export const card = {
    container: {
        borderRadius: border.radius,
        backgroundColor: background.primary,

        alignItems: 'center',
        paddingHorizontal: spacing.largest,
        paddingTop: spacing.regular,
        paddingBottom: spacing.large,
        marginHorizontal: spacing.regular,
        marginBottom: spacing.regular,

        elevation: 1.5,
        shadowColor: contrast.lower,
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        ...Platform.select({
            android: {
                borderWidth: 1,
                borderColor: contrast.lowest,
            },
        }),
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

export const cardActionImageWrapper = {
    container: {
        marginHorizontal: spacing.smaller,
        marginBottom: spacing.small,
        overflow: 'hidden',
    },
};
export const cardActionImage = {
    container: {
        // flexDirection: 'column',
    },
    image: {
        maxHeight: 80,
        // flexShrink: 1,
        resizeMode: 'contain',
    },
};

export const cardForm = {
    container: {
        borderRadius: border.radius,
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.larger,
        backgroundColor: background.primary,
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
