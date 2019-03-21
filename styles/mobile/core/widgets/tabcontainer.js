import { contrast, brand, background, font } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    TabContainer

    Default Class For Mendix TabContainer Widget
========================================================================== */

export const TabContainer = {
    tabView: {
        tabBarPosition: 'top',
    },
    tabBar: {
        bounces: true,
        pressColor: brand.primary,
        pressOpacity: 0.8,
        backgroundColor: background.primary,
        scrollEnabled: false,
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
// Tabcontainer as content of page
export const tabContainerMinimal = {
    tabView: {
        tabBarPosition: 'top',
        backgroundColor: 'transparent',
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    indicator: {},
    tab: {},
    label: {},
};
