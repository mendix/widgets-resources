import { spacing,contrast, border, font, background } from '../../../core/variables';
import merge from '../../../core/_helperfunctions/mergeobjects';
import { Platform } from 'react-native';

/* ==========================================================================
    Cards

========================================================================== */
export const card = {
    position: 'relative',
    height: 'auto',
    width: 200,
    backgroundColor: background.primary,
    padding: spacing.small,
    borderRadius: border.radius,
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
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

export const cardTitle = {
    marginHorizontal: spacing.small,
    fontSize: font.sizeLarge,
    marginBottom: spacing.large,
    color: contrast.high,
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//

export const cardFullWidth = merge(card, {
    height: 'auto',
    width: '100%',
    backgroundColor: background.primary,
    paddingHorizontal: spacing.regular,
    paddingTop: spacing.regular,
    paddingBottom: spacing.regular,
    alignItems: 'center',
});
