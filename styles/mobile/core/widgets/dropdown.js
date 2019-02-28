import { TextBox } from './textbox';
import { gray, spacing, border, font, background } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    DropDown

    Default Class For Mendix DropDown Widget
========================================================================== */

export const DropDown = {
  label: {
    ...TextBox.label,
    marginVertical: Platform.select({ ios: spacing.smaller, android: 0 }),
  },
  pickerIOS: {},
  pickerItemIOS: {},
  pickerBackdropIOS: {},
  pickerTopIOS: {},
  value: {
    color: font.color,
    borderColor: gray.lightest,
    ...Platform.select({
      ios: {
        padding: spacing.smaller,
        backgroundColor: 'transparent',
      },
      android: {
        borderWidth: 1,
        borderRadius: border.radius,
        padding: spacing.small,
        backgroundColor: background.primary,
      },
    }),
  },
};
export const DropDownVertical = {
  label: {
    ...DropDown.label,
    marginBottom: 5,
    marginLeft: spacing.small,
  },
  pickerIOS: DropDown.pickerIOS,
  pickerItemIOS: DropDown.pickerItemIOS,
  pickerBackdropIOS: DropDown.pickerBackdropIOS,
  pickerTopIOS: DropDown.pickerTopIOS,
  value: {
    ...DropDown.value,
    marginBottom: 20,
    backgroundColor: background.primary,
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
      },
      android: {},
    }),
  },
};
