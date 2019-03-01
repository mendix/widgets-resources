import { TextBox, TextBoxVertical } from './textbox';
import { spacing } from '../variables';

/* ==========================================================================
    DatePicker

    Default Class For Mendix DatePicker Widget
========================================================================== */

export const DatePicker = {
  label: TextBox.label,
  value: {
    color: TextBox.input.color,
    fontSize: TextBox.input.fontSize,
    backgroundColor: TextBox.input.backgroundColor,
    paddingVertical: TextBox.input.paddingVertical,
    // paddingHorizontal: TextBox.input.paddingHorizontal,
    borderRadius: TextBox.input.radius,
    borderWidth: TextBox.input.borderWidth,
    borderColor: TextBox.input.borderColor,
  },
};

export const DatePickerVertical = {
  label: {
    ...TextBoxVertical.label,
  },
  value: {
    ...TextBoxVertical.input,
    maxHeight: 40, //TODO: Needs to be properly fixed
  },
};

export const DatePickerNoLabel = {
  label: {
    flex: -1,
  },
  value: DatePicker.value,
};
