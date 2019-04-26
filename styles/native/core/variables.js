import * as custom from '../app/custom-variables';
import * as core from './variables';
import merge from './_helperfunctions/mergeobjects';

// for (const key in core) {
//     export const this[key] = merge(core[key], custom[key]);
// }

//== Global variables
//## Variables to be used during styling
//-------------------------------------------------------------------------------------------------------------------//
// System defined read-only values
// export const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

// Brand Style
export const brand = merge(core);

export const background = {};

export const contrast = {};

export const border = {};

export const font = {};

export const spacing = {};

export const button = {};

export const input = {};
