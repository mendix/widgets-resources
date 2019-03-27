import { contrast, brand, font, spacing } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Text

    Default Class For Mendix Text Widget
========================================================================== */

export const Text = {
    container: {},
    text: {
        color: font.color,
        fontSize: font.size,
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Text Colors

export const textPrimary = {
    container: {},
    text: {
        color: brand.primary,
    },
};
export const textSuccess = {
    container: {},
    text: {
        color: brand.success,
    },
};
export const textWarning = {
    container: {},
    text: {
        color: brand.warning,
    },
};
export const textDanger = {
    container: {},
    text: {
        color: brand.danger,
    },
};

export const textGrayDarkest = {
    container: {},
    text: {
        color: contrast.highest,
    },
};
export const textGrayDarker = {
    container: {},
    text: {
        color: contrast.higher,
    },
};
export const textGrayDark = {
    container: {},
    text: {
        color: contrast.high,
    },
};
export const textGray = {
    container: {},
    text: {
        color: contrast.regular,
    },
};
export const textGrayLight = {
    container: {},
    text: {
        color: contrast.low,
    },
};
export const textGrayLighter = {
    container: {},
    text: {
        color: contrast.lower,
    },
};
export const textGrayLightest = {
    container: {},
    text: {
        color: contrast.lowest,
    },
};

// Text Sizes
export const TextH1 = {
    container: {},
    text: {
        fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
        fontSize: font.sizeH1,
        marginBottom: spacing.small,
    },
};
export const TextH2 = {
    container: {},
    text: {
        fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
        fontSize: font.sizeH2,
        marginBottom: spacing.small,
    },
};
export const TextH3 = {
    container: {},
    text: {
        fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
        fontSize: font.sizeH3,
        marginBottom: spacing.small,
    },
};
export const TextH4 = {
    container: {},
    text: {
        fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
        fontSize: font.sizeH4,
        marginBottom: spacing.smaller,
    },
};
export const TextH5 = {
    container: {},
    text: {
        fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
        fontSize: font.sizeH5,
        marginBottom: spacing.smallest,
    },
};
export const TextH6 = {
    container: {},
    text: {
        fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
        fontSize: font.sizeH6,
        marginBottom: spacing.smallest,
    },
};
export const textSmall = {
    container: {},
    text: {
        fontSize: font.sizeSmall,
    },
};
export const textLarge = {
    container: {},
    text: {
        fontSize: font.sizeLarge,
    },
};

// Text Alignment
export const textLeft = {
    container: {},
    text: {
        textAlign: 'left',
    },
};
export const textCenter = {
    container: {},
    text: {
        textAlign: 'center',
    },
};
export const textRight = {
    container: {},
    text: {
        textAlign: 'right',
    },
};

// Text Weights
export const textLight = {
    container: {},
    text: {
        fontWeight: font.weightLight,
    },
};
export const textNormal = {
    container: {},
    text: {
        fontWeight: font.weightNormal,
    },
};
export const textSemiBold = {
    container: {},
    text: {
        fontWeight: font.weightSemiBold,
    },
};
export const textBold = {
    container: {},
    text: {
        fontWeight: font.weightBold,
    },
};

// Text Transformations
export const textLowercase = {
    container: {},
    text: {
        textTransform: 'lowercase',
    },
};
export const textUppercase = {
    container: {},
    text: {
        textTransform: 'uppercase',
    },
};
export const textCapitalize = {
    container: {},
    text: {
        textTransform: 'capitalize',
    },
};
