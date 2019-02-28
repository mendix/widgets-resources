import { Platform } from 'react-native';
import { button, spacing, font, gray } from '../variables';
import * as mixinButton from '../base/mixins/buttons';

/* ==========================================================================
    Buttons

    Default Class For Mendix Button Widget
========================================================================== */
export const ActionButton = {
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: button.primary.borderColor,
    backgroundColor: button.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: button.borderRadius,
    ...Platform.select({
      ios: {
        paddingVertical: spacing.smaller,
        paddingHorizontal: spacing.regular,
      },
      android: {
        paddingVertical: spacing.smaller,
        paddingHorizontal: spacing.small,
      },
    }),
  },
  icon: {
    color: button.primary.color,
  },
  caption: {
    textAlign: 'center',
    color: button.primary.color,
  },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Button Colors

// This mixin function takes the following order -> color, backgroundColor, borderColor
// export const btnPrimary = mixinButton.variant(button.primary.color, button.primary.background, button.primary.borderColor);// TODO: Remove?
export const btnSecondary = mixinButton.variant(button.secondary.color, button.secondary.background, button.secondary.borderColor);
export const btnSuccess = mixinButton.variant(button.success.color, button.success.background, button.success.borderColor);
export const btnWarning = mixinButton.variant(button.warning.color, button.warning.background, button.warning.borderColor);
export const btnDanger = mixinButton.variant(button.danger.color, button.danger.background, button.danger.borderColor);

// This mixin function will remove the background and border, and set the icon color
export const btnIconPrimary = mixinButton.iconOnly(button.primary.background);
export const btnIconSecondary = mixinButton.iconOnly(gray.light);
export const btnIconSuccess = mixinButton.iconOnly(button.success.background);
export const btnIconWarning = mixinButton.iconOnly(button.warning.background);
export const btnIconDanger = mixinButton.iconOnly(button.danger.background);

// Button sizes
export const btnSmall = {
  button: {},
  icon: {
    size: font.sizeSmall,
  },
  caption: {
    fontSize: font.sizeSmall,
  },
};
export const btnLarge = {
  button: {},
  icon: {
    size: font.sizeLarge,
  },
  caption: {
    fontSize: font.sizeLarge,
  },
};
export const btnLargest = {
  button: {},
  icon: {
    size: font.sizeH1,
  },
  caption: {
    fontSize: font.sizeH1,
  },
};

export const btnBlock = {
  button: {
    width: '100%',
  },
};
