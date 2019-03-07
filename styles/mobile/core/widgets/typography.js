import { gray, brand, font, spacing } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Text

    Default Class For Mendix Text Widget
========================================================================== */

export const Text = {
    color: font.color,
    fontSize: font.size,
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Text Colors

export const textPrimary = {
    color: brand.primary,
};
export const textSuccess = {
    color: brand.success,
};
export const textWarning = {
    color: brand.warning,
};
export const textDanger = {
    color: brand.danger,
};

export const textGrayDarkest = {
    color: gray.darkest,
};
export const textGrayDarker = {
    color: gray.darker,
};
export const textGrayDark = {
    color: gray.dark,
};
export const textGray = {
    color: gray.regular,
};
export const textGrayLight = {
    color: gray.light,
};
export const textGrayLighter = {
    color: gray.lighter,
};
export const textGrayLightest = {
    color: gray.lightest,
};

// Text Sizes
export const h1 = {
    fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
    fontSize: font.sizeH1,
    marginBottom: spacing.small,
};
export const h2 = {
    fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
    fontSize: font.sizeH2,
    marginBottom: spacing.small,
};
export const h3 = {
    fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
    fontSize: font.sizeH3,
    marginBottom: spacing.small,
};
export const h4 = {
    fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
    fontSize: font.sizeH4,
    marginBottom: spacing.smaller,
};
export const h5 = {
    fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
    fontSize: font.sizeH5,
    marginBottom: spacing.smallest,
};
export const h6 = {
    fontWeight: Platform.select({ ios: font.weightSemiBold, android: font.weightNormal }),
    fontSize: font.sizeH6,
    marginBottom: spacing.smallest,
};
export const textSmall = {
    fontSize: font.sizeSmall,
};
export const textLarge = {
    fontSize: font.sizeLarge,
};

// Text Alignment
export const textLeft = {
    textAlign: 'left',
};
export const textCenter = {
    textAlign: 'center',
};
export const textRight = {
    textAlign: 'right',
};

// Text Weights
export const textLight = {
    fontWeight: font.weightLight,
};
export const textNormal = {
    fontWeight: font.weightNormal,
};
export const textSemiBold = {
    fontWeight: font.weightSemiBold,
};
export const textBold = {
    fontWeight: font.weightBold,
};

// Text Transformations
export const textLowercase = {
    textTransform: 'lowercase',
};
export const textUppercase = {
    textTransform: 'uppercase',
};
export const textCapitalize = {
    textTransform: 'capitalize',
};
