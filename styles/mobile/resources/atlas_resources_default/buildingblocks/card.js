import { spacing, gray, border } from '../../../core/variables';
import { Platform, StyleSheet } from 'react-native';

/* ==========================================================================
    Cards

========================================================================== */
export const card = {
  position: 'relative',
  height: 'auto',
  width: 175,
  backgroundColor: '#FFF',
  padding: spacing.small,
  borderRadius: border.radius,
  elevation: 1.5,
  shadowColor: gray.lightest,
  shadowOpacity: 0.9,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },
  ...Platform.select({
    ios: {},
    android: {
      borderWidth: 1,
      borderColor: gray.lightest,
    },
  }),
};

//== Elements
//-------------------------------------------------------------------------------------------------------------------//

//Temporary invisible button to make a card clickable
export const cardButton = {
  button: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 99,
    opacity: 0,
  },
};

//== Variations
//-------------------------------------------------------------------------------------------------------------------//
