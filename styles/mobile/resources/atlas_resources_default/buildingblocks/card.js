import { spacing, contrast, border, font, background } from '../../../core/variables';
import merge from '../../../core/_helperfunctions/mergeobjects';
import { Platform } from 'react-native';

/* ==========================================================================
    Cards

========================================================================== */
export const card = {
    container: {
        borderRadius: border.radius,
        backgroundColor: background.primary,

        width: 200,
        height: 'auto',
        padding: spacing.small,
        marginVertical: spacing.regular,

        elevation: 1.5,
        shadowColor: contrast.lowest,
        shadowOpacity: 0.9,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
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
        color: contrast.high,
    },
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//

export const cardFullWidth = merge(card, {
    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: background.primary,
        paddingHorizontal: spacing.regular,
        paddingTop: spacing.regular,
        paddingBottom: spacing.regular,
        alignItems: 'center',
    },
});
