import { TextBox } from './textbox';
import { Platform } from 'react-native';
import { spacing } from '../variables';

/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */

export const CheckBox = {
  label: TextBox.label,
  input: {
    ...TextBox.input,
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
      },
      android: {
        backgroundColor: 'transparent',
      },
    }),
  },
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage,
};
export const CheckBoxVertical = {
  label: {
    ...CheckBox.label,
    marginBottom: 5,
    marginLeft: spacing.small,
  },
  input: {
    ...CheckBox.input,
    marginBottom: 20,
    marginLeft: spacing.small,
  },
  inputError: CheckBox.inputError,
  validationMessage: CheckBox.validationMessage,
};
