import { spacing, background, gray, border } from '../variables';
import { Platform } from 'react-native';

//== TEMP
export const androidSpacingInnerVerticalLarge = {
  paddingVertical: Platform.select({ ios: 0, android: spacing.large }),
};
export const androidSpacingInnerHorizontalMedium = {
  paddingHorizontal: Platform.select({ ios: 0, android: spacing.small }),
};
export const androidSpacingInnerVertical = {
  paddingVertical: Platform.select({ ios: 0, android: spacing.smallest }),
};
export const spacingOuterBottomNone = {
  marginBottom: 0,
};
export const hide = {
  display: 'none',
};
export const shadowBottom = {
  backgroundColor: '#FFF',
  elevation: 2,
  shadowColor: gray.lightest,
  // shadowOpacity: 0.9,
  // shadowRadius: 8,
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
};
export const borderTop = {
  ...Platform.select({
    ios: {
      borderTopWidth: 1,
      borderColor: gray.lightest,
    },
    android: {},
  }),
};
export const inputWrapper = {
  ...Platform.select({
    ios: {
      borderBottomWidth: 1,
      borderColor: gray.lightest,
      backgroundColor: background.primary,
    },
    android: {
      marginBottom: spacing.regular,
    },
  }),
};
/*_____________________________________________________________________________
----------------------- Helpers Above Are Temporary ---------------------------
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾*/

//== Background sizing
export const fullSize = {
  width: '100%',
  height: '100%',
};

//== Background Colors
export const backgroundPrimary = {
  backgroundColor: background.primary,
};
export const backgroundSecondary = {
  backgroundColor: background.secondary,
};

//== Flex layout
export const flexRow = {
  flexDirection: 'row',
};
export const flexWrap = {
  // flexWrap controls whether children can wrap around after they hit the end of a flex container.
  flexWrap: 'wrap',
};
export const flexSpaceBetween = {
  justifyContent: 'space-between',
};
export const flexSpaceEvenly = {
  justifyContent: 'space-evenly',
};
export const flexSpaceAround = {
  justifyContent: 'space-around',
};
export const flexCrossDirectionAlignCenter = {
  // alignItems aligns children in the cross direction.
  // For example, if children are flowing vertically, alignItems controls how they align horizontally.
  alignItems: 'center',
};
export const flexCrossDirectionAlignEnd = {
  // alignItems aligns children in the cross direction.
  // For example, if children are flowing vertically, alignItems controls how they align horizontally.
  alignItems: 'flex-end',
};
export const flexDirectionAlignCenter = {
  // justifyContent aligns children in the main direction.
  // For example, if children are flowing vertically, justifyContent controls how they align vertically.
  justifyContent: 'center',
};
export const flexDirectionAlignEnd = {
  // justifyContent aligns children in the main direction.
  // For example, if children are flowing vertically, justifyContent controls how they align vertically.
  justifyContent: 'flex-end',
};
export const flexAlignCenter = {
  ...flexDirectionAlignCenter,
  ...flexCrossDirectionAlignCenter,
};
export const flexMain = {
  // flex 1 will take all available space not taken by flexItems.
  flex: 1,
};
export const flexItem = {
  // When flex is -1, the component is normally sized according width and height.
  // However, if there's not enough space, the component will shrink to its minWidth and minHeight
  flex: -1,
};
export const flexItemCrossDirectionAlignStart = {
  // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
  alignSelf: 'flex-start',
};
export const flexItemCrossDirectionAlignCenter = {
  // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
  alignSelf: 'center',
};
export const flexItemCrossDirectionAlignEnd = {
  // controls how a child aligns in the cross direction, overriding the alignItems of the parent.
  alignSelf: 'flex-end',
};

//== Alignment
export const rowLeft = {
  ...flexRow,
  ...flexCrossDirectionAlignCenter,
};
export const rowCenter = {
  ...flexRow,
  ...flexAlignCenter,
};
export const rowRight = {
  ...flexRow,
  ...flexDirectionAlignEnd,
  ...flexCrossDirectionAlignCenter,
};
export const columnLeft = {
  ...flexCrossDirectionAlignCenter,
};
export const columnCenter = {
  ...flexAlignCenter,
};
export const columnRight = {
  ...flexDirectionAlignEnd,
  ...flexCrossDirectionAlignCenter,
};

//== Inner Spacing
export const spacingInner = {
  padding: spacing.smaller,
};
export const spacingInnerVertical = {
  paddingVertical: spacing.smaller,
};
export const spacingInnerHorizontal = {
  paddingHorizontal: spacing.smaller,
};
export const spacingInnerTop = {
  paddingTop: spacing.smaller,
};
export const spacingInnerRight = {
  paddingRight: spacing.smaller,
};
export const spacingInnerLeft = {
  paddingLeft: spacing.smaller,
};
export const spacingInnerBottom = {
  paddingBottom: spacing.smaller,
};

export const spacingInnerMedium = {
  padding: spacing.regular,
};
export const spacingInnerVerticalMedium = {
  paddingVertical: spacing.regular,
};
export const spacingInnerHorizontalMedium = {
  paddingHorizontal: spacing.regular,
};
export const spacingInnerTopMedium = {
  paddingTop: spacing.regular,
};
export const spacingInnerRightMedium = {
  paddingRight: spacing.regular,
};
export const spacingInnerLeftMedium = {
  paddingLeft: spacing.regular,
};
export const spacingInnerBottomMedium = {
  paddingBottom: spacing.regular,
};

export const spacingInnerLarge = {
  padding: spacing.larger,
};
export const spacingInnerVerticalLarge = {
  paddingVertical: spacing.larger,
};
export const spacingInnerHorizontalLarge = {
  paddingHorizontal: spacing.larger,
};
export const spacingInnerTopLarge = {
  paddingTop: spacing.larger,
};
export const spacingInnerRightLarge = {
  paddingRight: spacing.larger,
};
export const spacingInnerLeftLarge = {
  paddingLeft: spacing.larger,
};
export const spacingInnerBottomLarge = {
  paddingBottom: spacing.larger,
};

//== Outer Spacing
export const spacingOuter = {
  margin: spacing.smaller,
};
export const spacingOuterVertical = {
  marginVertical: spacing.smaller,
};
export const spacingOuterHorizontal = {
  marginHorizontal: spacing.smaller,
};
export const spacingOuterTop = {
  marginTop: spacing.smaller,
};
export const spacingOuterRight = {
  marginRight: spacing.smaller,
};
export const spacingOuterLeft = {
  marginLeft: spacing.smaller,
};
export const spacingOuterBottom = {
  marginBottom: spacing.smaller,
};

export const spacingOuterMedium = {
  margin: spacing.regular,
};
export const spacingOuterVerticalMedium = {
  marginVertical: spacing.regular,
};
export const spacingOuterHorizontalMedium = {
  marginHorizontal: spacing.regular,
};
export const spacingOuterTopMedium = {
  marginTop: spacing.regular,
};
export const spacingOuterRightMedium = {
  marginRight: spacing.regular,
};
export const spacingOuterLeftMedium = {
  marginLeft: spacing.regular,
};
export const spacingOuterBottomMedium = {
  marginBottom: spacing.regular,
};

export const spacingOuterLarge = {
  margin: spacing.larger,
};
export const spacingOuterVerticalLarge = {
  marginVertical: spacing.larger,
};
export const spacingOuterHorizontalLarge = {
  marginHorizontal: spacing.larger,
};
export const spacingOuterTopLarge = {
  marginTop: spacing.larger,
};
export const spacingOuterRightLarge = {
  marginRight: spacing.larger,
};
export const spacingOuterLeftLarge = {
  marginLeft: spacing.larger,
};
export const spacingOuterBottomLarge = {
  marginBottom: spacing.larger,
};
