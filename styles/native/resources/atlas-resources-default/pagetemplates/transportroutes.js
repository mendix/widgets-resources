import { background, border, contrast, font, spacing } from '../../../core/variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Lists

========================================================================== */

export const list = {
    container: {},
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

// Make the maps widget look like a header
export const mapsHeader = {
    container: {
        flex: 1,
        height: 250,
        elevation: 2,
        shadowColor: contrast.lowest,
        shadowOpacity: 0.9,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        zIndex: 10,
    },
    marker: {},
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//
