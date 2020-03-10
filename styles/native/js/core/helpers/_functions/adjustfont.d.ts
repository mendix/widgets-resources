declare const height: number, width: number;
/**
 * Adjust the font size based on the screen size
 *
 * @param   {number}    size   Font size
 *
 * @return  {number} Returns adjusted font size
 */
declare function adjustFont(size: number): number;
export { adjustFont as default, height, width };
