import { TextHeading1 } from './typography';
import { font } from '../variables';

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Page Title

    Default Class For Mendix Page Title Widget
========================================================================== */

export const PageTitle = {
    container: {
        // All ViewStyle properties are allowed
    },
    text: {
        // All TextStyle properties are allowed
        ...TextHeading1.text,
        color: font.color,
    },
};
