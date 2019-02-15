import { gray, brand } from "../variables";

/* ==========================================================================
    TopBar / BottomBar

    Default Class For Mendix TopBar / BottomBar
========================================================================== */

//TODO: Should we split this?
export const navigationStyle = {
  topBar: {
    backgroundColor: "#FFF",
    //   backButtonFontSize: ,
    backButtonColor: gray.dark,
    titleColor: gray.dark
    //   titleFontSize: ,
  },
  bottomBar: {
    backgroundColor: "#FFF",
    textColor: gray.dark,
    iconColor: gray.dark,
    selectedIconColor: brand.primary,
    selectedTextColor: brand.primary
  }
};
