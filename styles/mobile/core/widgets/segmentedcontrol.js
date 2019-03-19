import { merge } from '../variables-helpers';
import { gray, brand, font } from '../variables';
import { Platform } from 'react-native';

export const SegmentedControl = {
    container: {
        // All ViewStyle properties are allowed
    },
    disabled: {
        // All ViewStyle properties are allowed
    },
    tab: {
        // All ViewStyle properties are allowed
        borderColor: Platform.select({ ios: brand.primary, android: gray.lighter }),
    },
    text: {
        // All TextStyle properties are allowed
        color: Platform.select({ ios: brand.primary, android: gray.dark }),
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
                // borderColor: gray.darker,
                // backgroundColor: gray.darker,
            },
        }),
    },
    activeTabText: {
        // All TextStyle properties are allowed
    },
};
