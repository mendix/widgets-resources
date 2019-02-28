import { Platform } from 'react-native';
import { TextBox } from './textbox';
import { spacing, gray, background } from '../variables';

/* ==========================================================================
    TextArea

    Default Class For Mendix TextArea Widget
========================================================================== */

export const TextArea = {
  label: {
    ...TextBox.label,
    textAlignVertical: 'top',
  },
  input: {
    ...TextBox.input,
    textAlignVertical: 'top',
  },
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage,
};
export const TextAreaVertical = {
  label: {
    ...TextArea.label,
    marginBottom: 5,
    marginLeft: spacing.small,
  },
  input: {
    ...TextArea.input,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: gray.lightest,
        backgroundColor: background.primary,
      },
      android: {},
    }),
  },
  inputError: TextArea.inputError,
  validationMessage: TextArea.validationMessage,
};
