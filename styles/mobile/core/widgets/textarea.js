import { TextBox, TextBoxVertical } from './textbox';
import { merge } from '../variables-helpers';

/* ==========================================================================
    TextArea

    Default Class For Mendix TextArea Widget
========================================================================== */

export const TextArea = merge(TextBox, {
    label: {
        textAlignVertical: 'top',
    },
    input: {
        textAlignVertical: 'top',
    },
});
export const TextAreaVertical = TextBoxVertical;
export const TextAreaNoLabel = {
    label: {
        flex: -1,
    },
    input: TextArea.input,
    inputError: TextArea.inputError,
    validationMessage: TextArea.validationMessage,
};
