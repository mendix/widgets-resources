import { gray, brand, background } from '../variables';
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
    pressColor: background.secondary,
    pressOpacity: 0.1,
    backgroundColor: background.primary,
    ...Platform.select({
      ios: {
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        scrollEnabled: true,
      },
      android: {
        scrollEnabled: false,
      },
    }),
  },
  indicator: {
    backgroundColor: brand.primary,
    height: Platform.select({ ios: 0, android: 2 }),
  },
  tab: {
    ...Platform.select({
      ios: {
        padding: 0,
        borderWidth: 1,
        borderColor: brand.primary,
        borderRadius: 4,
      },
      android: {},
    }),
  },
  label: {
    color: gray.darkest,
    ...Platform.select({
      ios: {
        margin: 0,
        padding: 0,
      },
      android: {},
    }),
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
