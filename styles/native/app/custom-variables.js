// import * as core from '../core/variables';
import { setContrastScale } from '../core/_helperfunctions/convertcolors';
// import merge from '../core/_helperfunctions/mergeobjects';

/*
==> You can find some examples of the core variables below. (From styles/native/core/variables.js)
==> To change any other core variables, copy them to this file and change them here.
==> DO NOT change the core variable file, as that makes updating Atlas a lot harder in the future.
*/

//== Global variables
//## Variables to be used during styling
//-------------------------------------------------------------------------------------------------------------------//
// Brand Style
export const brand = {
    primary: '#0595DB',
    success: '#76CA02',
    warning: '#f99b1d',
    danger: '#ed1c24',
};

// Dark Mode
const darkMode = true;

// Background Colors
const backgroundColor = darkMode ? '#222' : '#FFF';

export const background = {
    primary: backgroundColor,
    secondary: setContrastScale(0.03, backgroundColor),
};
