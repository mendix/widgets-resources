import { Platform } from 'react-native';
import { TextBox, TextBoxVertical } from './textbox';
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
    ...TextBoxVertical.label,
  },
  input: {
    ...TextBoxVertical.input,
  },
  inputError: TextBoxVertical.inputError,
  validationMessage: TextBoxVertical.validationMessage,
};
export const TextAreaNoLabel = {
  label: {
    flex: -1,
  },
  input: TextArea.input,
  inputError: TextArea.inputError,
  validationMessage: TextArea.validationMessage,
};
