import merge from '../_helperfunctions/mergeobjects';
import {contrast, brand, font, background } from '../variables';
import { Platform } from 'react-native';

export const com_mendix_widget_native_segmentedcontrol_SegmentedControl = (SegmentedControl = {
    container: {
        // All ViewStyle properties are allowed
    },
    disabled: {
        // All ViewStyle properties are allowed
    },
    tab: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
        borderColor: Platform.select({ ios: brand.primary, android: contrast.lower }),
    },
    text: {
        // All TextStyle properties are allowed
        color: Platform.select({ ios: brand.primary, android: contrast.high }),
    },
    activeTab: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                backgroundColor: brand.primary,
                borderColor: brand.primary,
            },
            android: {
                backgroundColor: brand.primary,
                borderColor: brand.primary,
                // borderColor: contrast.higher,
                // backgroundColor: contrast.higher,
            },
        }),
    },
    activeTabText: {
        // All TextStyle properties are allowed
    },
});
