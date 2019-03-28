import { contrast, brand, background, font } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    Tab Container

    Default Class For Mendix Tab Container Widget
========================================================================== */

export const TabContainer = {
    container: {
        // flex: 1,
        // flexGrow: 1,
        // width: '100%',
        // height: '100%',
    },
    tabBar: {
        bounces: true,
        pressColor: contrast.lower,
        pressOpacity: 0.8,
        // tabBarPosition: 'top',
        backgroundColor: background.primary,
        // scrollEnabled: false,
    },
    indicator: {
        backgroundColor: brand.primary,
        height: Platform.select({ ios: 2, android: 2 }),
    },
    tab: {
        flex: 1,
    },
    label: {
        color: contrast.highest,
    },
};

//== Design Properties
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Tab container as content of page

export const tabContainerMinimal = {
    tabView: {
        tabBarPosition: 'top',
        backgroundColor: 'transparent',
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
};
