import { merge } from '../variables-helpers';
import { gray, brand, font } from '../variables';
import { Platform } from 'react-native';

const blue = 'rgb(0,122,255)';
const purple = 'rgb(98,0,238)';

export const SegmentedControlDefault = {
    container: {
        // All ViewStyle properties are allowed
        borderRadius: Platform.select({ android: 3 }),
    },
    disabled: {
        // All ViewStyle properties are allowed
    },
    tab: {
        // All ViewStyle properties are allowed
        borderRadius: 0,
        borderColor: Platform.select({ ios: blue, android: gray.lighter }),
    },
    text: {
        // All TextStyle properties are allowed
        ...Platform.select({
            ios: {
                color: blue,
                fontWeight: font.weightNormal,
            },
            android: {
                color: gray.dark,
                paddingVertical: 3,
                fontWeight: font.weightSemiBold,
            },
        }),
    },
    activeTab: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                borderColor: blue,
                backgroundColor: blue,
            },
            android: {
                borderColor: purple,
                backgroundColor: purple,
            },
        }),
    },
    activeTabText: {
        // All TextStyle properties are allowed
        color: '#fff',
    },
};

export const SegmentedControl = merge(SegmentedControlDefault, {
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
});
