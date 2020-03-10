/**
 * Blend two colors or add a shade to color
 * Colors can be:
 *      HEX => (#FFFFFF / #FFF)
 *      RGB => rgb(255,255,255)
 *      RGBA => rgba(255,255,255, 0.8)
 *
 * Usage:
 *      shade => shadeBlendConvert(-0.5, "#FFF") // Makes #FFF 50% darker
 *      shade => shadeBlendConvert(0.5, "#000") // Makes #000 50% lighter
 *      shade => shadeBlendConvert(0.5, "#000", "c") // Makes #000 50% lighter and converts HEX to RGB
 *      blend => shadeBlendConvert(0.2, "rgb(0,0,0)", "rgb(0,200,0)") // rgb(0,0,0) + rgb(0,200,0) + 20% Blend will become rgb(0,40,0)
 *      blend => shadeBlendConvert(-0.2, "rgb(0,0,0)", "rgb(0,200,0)") // rgb(0,0,0) + rgb(0,200,0) + -20% Blend will become rgb(0,160,0)
 *      blend => shadeBlendConvert(0.75, "rgb(200,60,20)", "#67DAF0") // rgb(200,60,20) + #67DAF0 + 75% Blend will become #7fb3b9
 *
 *
 * @param   {number}    c   Amount of change. Value between -1 and 1
 * @param   {string}    fromValue   HEX / RGB / RGBA Color
 * @param   {string}    toValue   HEX / RGB / RGBA Color to blend with. If (to === 'c') return value will be RGB Color
 *
 * @return  {string} Returns HEX color or RGB color if parameter to === 'c'
 */
export declare function shadeBlendConvert(c: number | undefined, fromValue: string | undefined, toValue?: string | undefined): string;
