/**
 * Converts any color format to RGB string
 *
 * @param   {string}    anyColor   Accepts any color format
 *
 * @return  {string} Returns RGB color; `r,g,b`
 */
export declare function anyColorToRgbString(anyColor: any): string;
/**
 * Set best contrast color based on a (background) color
 *
 * @param   {string}    color   Accepts any color format
 *
 * @return  {string} Returns RGB Alpha color
 */
export declare function setColorBasedOnBackground(color: any): "rgba(0,0,0,.87)" | "rgba(255,255,255,.87)";
/**
 * Expects a color and a contrast value between 0 and 1.'
 * It will look at the supplied color's brightness and will start the contrast scale either from #000 (black) or #FFF (white).
 * This function will work best when you supply a very dark or very bright color.
 * It will return a gray color with the desired contrast which is based on the specified color.
 *
 * @param   {string}    color   Accepts any color format
 * @param   {number}    contrast   Accepts a value between 0 and 1
 *
 * @return  {string} Returns HEX color
 */
export declare function setContrastScale(contrast: any, color: any): string;
