import { contrast, brand, background, font } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Tab Container

    Default Class For Mendix Tab Container Widget
========================================================================== */

export const TabContainer = {
    container: {
        flex: 1,
    },
    tabBar: {
        bounces: true,
        pressColor: contrast.lower,
        pressOpacity: 0.8,
        // tabBarPosition: 'top',
        backgroundColor: background.primary,
        scrollEnabled: true,
    },
    indicator: {
        backgroundColor: brand.primary,
        height: Platform.select({ ios: 2, android: 2 }),
    },
    tab: {},
    label: {
        color: contrast.highest,
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Tab container as content of page

export const tabContainerMinimal = {
    container: {
        tabBarPosition: 'top',
        backgroundColor: 'transparent',
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
};
