import { gray, spacing, border, brand, font, background } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    TextBox

    Default Class For Mendix TextBox Widget
========================================================================== */

export const TextBox = {
  label: {
    color: gray.darker,
    fontSize: font.size,
    textAlign: Platform.select({ ios: 'left', android: 'right' }),
    marginRight: spacing.regular,
  },
  input: {
    color: font.color,
    fontSize: font.size,
    placeholderTextColor: gray.light,
    selectionColor: gray.lighter,
    paddingVertical: spacing.smaller,
    paddingHorizontal: spacing.small,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
      android: {
        borderWidth: 1,
        borderColor: gray.lighter,
        borderRadius: border.radius,
        underlineColorAndroid: 'transparent',
        backgroundColor: background.primary,
      },
    }),
  },
  inputError: {
    placeholderTextColor: brand.danger,
    selectionColor: brand.danger,
    underlineColorAndroid: 'transparent',
  },
  validationMessage: {
    color: brand.danger,
    borderWidth: 1,
    borderRadius: border.radius,
    borderColor: brand.danger,
    backgroundColor: '#FFF',
    padding: spacing.small,
  },
};

export const TextBoxVertical = {
  label: {
    color: TextBox.label.color,
    fontSize: TextBox.label.fontSize,
    marginBottom: 5,
    marginLeft: spacing.small,
    textAlign: 'left', //FIXME: Shouldn't be needed
  },
  input: {
    ...TextBox.input,
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
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage,
};

export const TextBoxNoLabel = {
  label: {
    flex: -1,
  },
  input: {
    ...TextBox.input,
  },
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage,
};
