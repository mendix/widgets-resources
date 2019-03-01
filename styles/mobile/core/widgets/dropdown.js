import { TextBox, TextBoxVertical } from './textbox';
import { gray, spacing, border, font, background } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    DropDown

    Default Class For Mendix DropDown Widget
========================================================================== */

export const DropDown = {
  label: {
    ...TextBox.label,
  },
  pickerIOS: {},
  pickerItemIOS: {},
  pickerBackdropIOS: {},
  pickerTopIOS: {},
  value: {
    color: font.color,
    // fontSize: font.size,
    borderColor: gray.lightest,
    ...Platform.select({
      ios: {
        padding: spacing.smaller,
        backgroundColor: 'transparent',
      },
      android: {
        borderWidth: 1,
        borderRadius: border.radius,
        paddingVertical: spacing.smaller,
        paddingHorizontal: spacing.small,
        backgroundColor: background.primary,
      },
    }),
  },
};
export const DropDownVertical = {
  label: {
    ...TextBoxVertical.label,
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

export const DropDownNoLabel = {
  label: {
    flex: -1,
  },
  pickerIOS: DropDown.pickerIOS,
  pickerItemIOS: DropDown.pickerItemIOS,
  pickerBackdropIOS: DropDown.pickerBackdropIOS,
  pickerTopIOS: DropDown.pickerTopIOS,
  value: DropDown.value,
};
