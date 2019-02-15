import { gray, brand, background } from "../variables";
import { Platform } from "react-native";

/* ==========================================================================
    TabContainer

    Default Class For Mendix TabContainer Widget
========================================================================== */

export const TabContainer = {
  tabView: {
    tabBarPosition: "top"
  },
  tabBar: {
    bounces: true,
    pressColor: background.dark,
    pressOpacity: 1,
    scrollEnabled: true,
    backgroundColor: background.light,
    ...Platform.select({
      ios: {
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
      },
      android: {
        height: 50,
        alignItems: "flex-start"
      }
    })
  },
  indicator: {
    backgroundColor: background.primary,
    height: Platform.select({ ios: 0, android: 2 })
  },
  tab: {
    ...Platform.select({
      ios: {
        padding: 0,
        borderWidth: 1,
        borderColor: brand.primary,
        borderRadius: 4
      },
      android: {}
    })
  },
  label: {
    margin: 0,
    padding: 0,
    color: gray.regular
  }
};
