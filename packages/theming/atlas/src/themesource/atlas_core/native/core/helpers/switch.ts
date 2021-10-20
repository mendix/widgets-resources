import { SwitchType } from "../../types/widgets";
import { brand } from "../../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Switch

    Default Class For Mendix Switch Widget
========================================================================== */
// Switch Color
export const switchSuccess: SwitchType = {
    input: {
        trackColorOn: brand.success
    }
};
export const switchWarning: SwitchType = {
    input: {
        trackColorOn: brand.warning
    }
};
export const switchDanger: SwitchType = {
    input: {
        trackColorOn: brand.danger
    }
};
