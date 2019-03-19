import { spacing, gray, border, font } from '../../../core/variables';
import { merge } from '../../../core/variables-helpers';
import { Platform } from 'react-native';

/* ==========================================================================
    Cards

========================================================================== */
export const card = {
    position: 'relative',
    height: 'auto',
    width: 200,
    backgroundColor: '#FFF',
    padding: spacing.small,
    borderRadius: border.radius,
    elevation: 1.5,
    shadowColor: gray.lightest,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: 5,
    },
    ...Platform.select({
        android: {
            borderWidth: 1,
            borderColor: gray.lightest,
        },
    }),
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

export const cardTitle = {
    marginHorizontal: spacing.small,
    fontSize: font.sizeLarge,
    marginBottom: spacing.large,
    color: gray.dark,
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//

export const cardFullWidth = merge(card, {
    height: 'auto',
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: spacing.regular,
    paddingTop: spacing.regular,
    paddingBottom: spacing.regular,
    alignItems: 'center',
});
