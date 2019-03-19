import { gray, spacing, font, border } from '../../../core/variables';
import { Platform } from 'react-native';

/* ==========================================================================
   Form Block

   Used in default forms
========================================================================== */

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

export const formTitle = {
    marginHorizontal: spacing.small,
    ...Platform.select({
        ios: {
            color: gray.regular,
            fontSize: font.sizeSmall,
            textTransform: 'uppercase',
            marginBottom: spacing.smallest,
        },
        android: {
            color: gray.dark,
            fontWeight: font.weightSemiBold,
            marginBottom: spacing.smaller,
        },
    }),
};
