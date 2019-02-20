import { gray, brand, font } from "../variables";

/* ==========================================================================
    Text

    Default Class For Mendix Text Widget
========================================================================== */

export const Text = {
  color: font.color,
  fontSize: font.size
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Text Colors

export const textPrimary = {
  color: brand.primary
};
export const textSecondary = {
  color: brand.secondary
};
export const textSuccess = {
  color: brand.success
};
export const textWarning = {
  color: brand.warning
};
export const textDanger = {
  color: brand.danger
};

export const textGrayDarkest = {
  color: gray.darkest
};
export const textGrayDarker = {
  color: gray.darker
};
export const textGrayDark = {
  color: gray.dark
};
export const textGrayRegular = {
  color: gray.regular
};
export const textGrayLight = {
  color: gray.light
};
export const textGrayLighter = {
  color: gray.lighter
};
export const textGrayLightest = {
  color: gray.lightest
};

// Text Sizes
export const h1 = {
  fontSize: font.sizeH1
};
export const h2 = {
  fontSize: font.sizeH2
};
export const h3 = {
  fontSize: font.sizeH3
};
export const h4 = {
  fontSize: font.sizeH4
};
export const h5 = {
  fontSize: font.sizeH5
};
export const h6 = {
  fontSize: font.sizeH6
};
export const textSmall = {
  fontSize: font.sizeSmall
};
export const textLarge = {
  fontSize: font.sizeLarge
};

// Text Alignment
export const textLeft = {
  textAlign: "left"
};
export const textCenter = {
  textAlign: "center"
};
export const textRight = {
  textAlign: "right"
};

// Text Weights
export const textLight = {
  fontWeight: font.weightLight
};
export const textNormal = {
  fontWeight: font.weightNormal
};
export const textSemiBold = {
  fontWeight: font.weightSemiBold
};
export const textBold = {
  fontWeight: font.weightBold
};

// Text Transformations
export const textLowercase = {
  textTransform: "lowercase"
};
export const textUppercase = {
  textTransform: "uppercase"
};
export const textCapitalize = {
  textTransform: "capitalize"
};
