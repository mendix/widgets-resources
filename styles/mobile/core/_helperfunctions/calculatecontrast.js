import colors from './colorwords.js';

// const grayScale = ['#F9F9F9', '#EEE', '#DDD', '#CCC', '#BBB', '#AAA', '#999', '#888', '#777', '#666', '#555', '#444', '#333', '#222', '#111', '#070707'];
// const grayScale = ['#EEE', '#DDD', '#CCC', '#BBB', '#AAA', '#999', '#888', '#777', '#666', '#555', '#444', '#333', '#222', '#111'];
// const colorContrast = ['#DDD', '#EEE', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#000', '#000', '#000', '#000', '#000', '#000', '#111', '#222'];

/**
 * Converts RGB color to HEX
 *
 * @param   {number || string}    r   Accepts RGB as string || Accepts R as string or number
 * @param   {number || string}    g   Accepts G as string or number
 * @param   {number || string}    b   Accepts B as string or number
 *
 * @return  {string} Returns HEX color
 */
function RGBToHex(r, g, b) {
    if (typeof r === 'string' && !g && !b) {
        const color = r.replace(/rgb[(]|[)]/gm, '');
        [r, g, b] = color.split(',');
    }
    return '#' + ((1 << 24) + (Number(r) << 16) + (Number(g) << 8) + Number(b)).toString(16).slice(1);
    // return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Converts HEX or HEX Alpha to RGB
 *
 * @param   {string}    hex   Accepts HEX color
 *
 * @return  {object} Returns RGB color
 */
function hexToRGB(hex) {
    hex = hex.substring(1);
    hex = hex.length === 3 || hex.length === 4 ? [...hex].map(x => x + x).join('') : hex;
    return rgbaToRGB({
        r: parseInt('0x' + hex[0] + hex[1], 16),
        g: parseInt('0x' + hex[2] + hex[3], 16),
        b: parseInt('0x' + hex[4] + hex[5], 16),
        a: parseInt('0x' + hex[6] + hex[7], 16) / 255 || 1,
    });
}

/**
 * Converts HEX color to RGB string
 *
 * @param   {string}    hex   Accepts HEX color
 *
 * @return  {string} Returns RGB color
 */
export function hexToRGBString(hex) {
    const object = hexToRGB(hex);
    return [object.r, object.g, object.b].join(',');
}

/**
 * Converts HSL to RGB color
 *
 * @param   {string}    hsl   Accepts HSL color
 *
 * @return  {object} Returns RGB color
 */
function hslToRGB(hsl) {
    let [h, s, l, a = '1'] = hsl.replace(/hsla?[(]|[%]|[)]/gm, '').split(',');
    [h, s, l, a].forEach(x => Number(x.trim()));
    s /= 100;
    l /= 100;

    // Strip label and convert to degrees (if necessary)
    if (!!~h.indexOf('deg')) h = h.substr(0, h.length - 3);
    else if (!!~h.indexOf('rad')) h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
    else if (!!~h.indexOf('turn')) h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360) h %= 360; // Keep hue fraction of 360 if ending up over

    let r, g, b;
    let c = (1 - Math.abs(2 * l - 1)) * s; // chroma -> color intensity
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1)); // Second largest component (first being chroma)
    let m = l - c / 2; // Amount to add to each channel to match lightness

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    return rgbaToRGB({
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
        a,
    });
}

// RGB with HEX or Word to RGB
// Accepts:
//== //TODO
function rgbToRGB(rgb) {
    const color = rgb.replace(/rgb[(]|[)]/gm, '');
    // if rgb has hex color definition
    if (!!~rgb.indexOf('#')) return hexToRGB(color);
    // if rgb has word color definition
    else if (!/\d/.test(rgb)) return colors[color.toLowerCase()];
    // if rgb has rgb color definition
    else {
        const [r, g, b] = color.split(',');
        [r, g, b].forEach(x => x.trim());
        return { r, g, b };
    }
}

// RGB Alpha to RGB
// Accepts:
//== //TODO
function rgbaToRGB(rgba) {
    let RGB = typeof rgba === 'object' ? rgba : {};
    const calc = val => Math.round(RGB.a * (val / 255) * 255); // Calc best color contrast values
    // const calc = val => Math.round((RGB.a * (val / 255) + (RGB.a * ( 0 / 255))) * 255); // Calc best color contrast values

    if (typeof rgba === 'string') {
        const val = rgba.replace(/rgba[(]|[)]/gm, '');
        let color = val.slice(0, val.lastIndexOf(',')).trim();
        let alpha = Number(val.slice(val.lastIndexOf(',') + 1).trim());

        // if rgba has hex color definition
        if (color[0] === '#') RGB = hexToRGB(color);
        // if rgba has word color definition
        else if (!/\d/.test(color)) RGB = colors[color.toLowerCase()];
        // if rgba has rgb color definition
        else {
            let [r, g, b] = color.split(',');
            [r, g, b].forEach(x => Number(x.trim()));
            RGB = { r, g, b };
        }
        // RGB.a = alpha;
        RGB.a = alpha === 1 ? 1 : (1 - alpha).toPrecision(2);
    }
    return { r: calc(RGB.r), g: calc(RGB.g), b: calc(RGB.b) };
}

// Check what kind of color type is used.
// Accepts:
//== //TODO
function checkColor(color) {
    if (typeof color === 'string') {
        if (color in colors) return colors[color.toLowerCase()];
        else if (color[0] === '#') return hexToRGB(color);
        else if (!!~color.indexOf('hsl')) return hslToRGB(color);
        else if (!!~color.indexOf('rgba')) return rgbaToRGB(color);
        else if (!!~color.indexOf('rgb')) return rgbToRGB(color);
    }
}

// Expects a (background) color and returns the best contrast color
// Accepts:
//== //TODO
export function setColorBasedOnBackground(color) {
    const c = checkColor(color);
    const RGB = typeof c === 'object' ? c : { r: '255', g: '255', b: '255' };

    // https://www.w3.org/TR/AERT/#color-contrast
    const o = Math.round((RGB.r * 299 + RGB.g * 587 + RGB.b * 114) / 1000);
    return o > 125 ? 'rgba(0,0,0,.87)' : 'rgba(255,255,255,.87)';
    // return o > 125 ? contrast.higher : "#FFF";
}

// export function setColorBasedOnBackground(color) {
//     const max = 256;
//     const c = checkColor(color);
//     const RGB = typeof c === "object" ? c : { r: "255", g: "255", b: "255" };

//     // https://www.w3.org/TR/AERT/#color-contrast
//     const o = Math.round((RGB.r * 299 + RGB.g * 587 + RGB.b * 114) / 1000);
//     const index = Math.round((o / max) * (colorContrast.length - 1));
//     return colorContrast[index];
//     // return o > 125 ? contrast.higher : "#FFF";
// }

/**
 * Expects a color and a contrast value between 0 and 1.
 * It will return a gray color with the desired contrast which is based on the specified color
 *
 * @param   {string}    color   Accepts any color format
 *
 * @return  {string} Returns HEX color
 */
export function setContrastScale(color, contrast) {
    if (contrast > 1) contrast = 1;
    if (contrast < 0) contrast = 0;
    const max = 256;
    const c = checkColor(color);
    const RGB = typeof c === 'object' ? c : { r: '255', g: '255', b: '255' };

    // https://www.w3.org/TR/AERT/#color-contrast
    const brightness = Math.round((RGB.r * 299 + RGB.g * 587 + RGB.b * 114) / 1000);
    const value = Math.round(brightness > max / 2 ? max - max * contrast : max * contrast);
    return RGBToHex(value, value, value);
}
