import { spacing, gray, border } from "../../../core/variables";

/* ==========================================================================
    Cards

========================================================================== */
export const card = {
  backgroundColor: "#FFF",
  padding: spacing.small,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: gray.lightest,
  borderRadius: border.radius,
  elevation: 2,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: {
    width: 0,
    height: 1
  }
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//
export const cardHeader = {};
export const cardFooter = {};
export const cardIconWrapper = {
  width: 60,
  height: 60,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: gray.lightest
};
export const cardIcon = {};

export const cardDetail = {
  ...card
};
export const cardDetailHeader = {
  justifyContent: "space-between",
  marginBottom: 20
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//
