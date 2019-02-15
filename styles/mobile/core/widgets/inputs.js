import { gray, spacing, border, brand } from "../variables";
import { Platform } from "react-native";

/* ==========================================================================
    TextBox

    Default Class For Mendix TextBox Widget
========================================================================== */

export const TextBox = {
  label: {
    color: gray.light
  },
  input: {
    color: gray.regular,
    placeholderTextColor: gray.light,
    selectionColor: gray.lightest,
    borderColor: gray.lightest,
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        padding: spacing.smaller
      },
      android: {
        borderWidth: 1,
        borderRadius: border.radius,
        padding: spacing.small,
        underlineColorAndroid: "transparent"
      }
    })
  },
  inputError: {
    placeholderTextColor: brand.danger,
    selectionColor: brand.danger,
    underlineColorAndroid: "transparent"
  },
  validationMessage: {
    color: brand.danger,
    borderWidth: 1,
    borderRadius: border.radius,
    borderColor: brand.danger,
    backgroundColor: "#FFF",
    padding: spacing.small
  }
};

export const TextBoxVertical = {
  label: {
    ...TextBox.label,
    marginBottom: 5,
    marginLeft: Platform.select({ ios: 0, android: spacing.small })
  },
  input: {
    ...TextBox.input,
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1
      },
      android: {}
    })
  },
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage
};

/* ==========================================================================
    TextArea

    Default Class For Mendix TextArea Widget
========================================================================== */

export const TextArea = {
  label: TextBox.label,
  input: {
    ...TextBox.input,
    textAlignVertical: "top"
  },
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage
};
export const TextAreaVertical = {
  label: {
    ...TextArea.label,
    marginBottom: 5
  },
  input: TextArea.input,
  inputError: TextArea.inputError,
  validationMessage: TextArea.validationMessage
};

/* ==========================================================================
    DropDown

    Default Class For Mendix DropDown Widget
========================================================================== */

export const DropDown = {
  label: TextBox.label,
  pickerIOS: {},
  pickerItemIOS: {},
  pickerBackdropIOS: {},
  pickerTopIOS: {},
  value: {
    color: gray.regular,
    borderColor: gray.lightest,
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: spacing.smaller
      },
      android: {
        borderWidth: 1,
        borderRadius: border.radius,
        padding: spacing.small
      }
    })
  }
};
export const DropDownVertical = {
  label: {
    ...DropDown.label,
    marginBottom: 5
  },
  pickerIOS: DropDown.pickerIOS,
  pickerItemIOS: DropDown.pickerItemIOS,
  pickerBackdropIOS: DropDown.pickerBackdropIOS,
  pickerTopIOS: DropDown.pickerTopIOS,
  value: DropDown.value
};

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
        borderBottomWidth: 1
      },
      android: {}
    })
  },
  inputError: TextBox.inputError,
  validationMessage: TextBox.validationMessage
};
export const CheckBoxVertical = {
  label: {
    ...CheckBox.label,
    marginBottom: 5
  },
  input: CheckBox.input,
  inputError: CheckBox.inputError,
  validationMessage: CheckBox.validationMessage
};

/* ==========================================================================
    DatePicker

    Default Class For Mendix DatePicker Widget
========================================================================== */

export const DatePicker = {
  label: TextBox.label,
  value: {
    borderColor: gray.lightest,
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: spacing.smaller
      },
      android: {
        borderWidth: 1,
        borderRadius: border.radius,
        padding: spacing.small
      }
    })
  }
};
