import { TextH1 } from './typography';
import { font } from '../variables';

/* ==========================================================================
    Page Title

    Default Class For Mendix Page Title Widget
========================================================================== */

export const PageTitle = {
    container: {
        ...TextH1,
        color: font.color,
    },
};
