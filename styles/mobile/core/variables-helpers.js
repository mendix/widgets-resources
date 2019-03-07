import { gray, deviceWidth, deviceHeight } from './variables';
import { PixelRatio } from 'react-native';

const pixelRatio = PixelRatio.get();
const colors = {
    aliceblue: { r: 240, g: 248, b: 255 },
    antiquewhite: { r: 250, g: 235, b: 215 },
    aqua: { r: 0, g: 255, b: 255 },
    aquamarine: { r: 127, g: 255, b: 212 },
    azure: { r: 240, g: 255, b: 255 },
    beige: { r: 245, g: 245, b: 220 },
    bisque: { r: 255, g: 228, b: 196 },
    black: { r: 0, g: 0, b: 0 },
    blanchedalmond: { r: 255, g: 235, b: 205 },
    blue: { r: 0, g: 0, b: 255 },
    blueviolet: { r: 138, g: 43, b: 226 },
    brown: { r: 165, g: 42, b: 42 },
    burlywood: { r: 222, g: 184, b: 135 },
    cadetblue: { r: 95, g: 158, b: 160 },
    chartreuse: { r: 127, g: 255, b: 0 },
    chocolate: { r: 210, g: 105, b: 30 },
    coral: { r: 255, g: 127, b: 80 },
    cornflowerblue: { r: 100, g: 149, b: 237 },
    cornsilk: { r: 255, g: 248, b: 220 },
    crimson: { r: 220, g: 20, b: 60 },
    cyan: { r: 0, g: 255, b: 255 },
    darkblue: { r: 0, g: 0, b: 139 },
    darkcyan: { r: 0, g: 139, b: 139 },
    darkgoldenrod: { r: 184, g: 134, b: 11 },
    darkgray: { r: 169, g: 169, b: 169 },
    darkgreen: { r: 0, g: 100, b: 0 },
    darkgrey: { r: 169, g: 169, b: 169 },
    darkkhaki: { r: 189, g: 183, b: 107 },
    darkmagenta: { r: 139, g: 0, b: 139 },
    darkolivegreen: { r: 85, g: 107, b: 47 },
    darkorange: { r: 255, g: 140, b: 0 },
    darkorchid: { r: 153, g: 50, b: 204 },
    darkred: { r: 139, g: 0, b: 0 },
    darksalmon: { r: 233, g: 150, b: 122 },
    darkseagreen: { r: 143, g: 188, b: 143 },
    darkslateblue: { r: 72, g: 61, b: 139 },
    darkslategray: { r: 47, g: 79, b: 79 },
    darkslategrey: { r: 47, g: 79, b: 79 },
    darkturquoise: { r: 0, g: 206, b: 209 },
    darkviolet: { r: 148, g: 0, b: 211 },
    deeppink: { r: 255, g: 20, b: 147 },
    deepskyblue: { r: 0, g: 191, b: 255 },
    dimgray: { r: 105, g: 105, b: 105 },
    dimgrey: { r: 105, g: 105, b: 105 },
    dodgerblue: { r: 30, g: 144, b: 255 },
    firebrick: { r: 178, g: 34, b: 34 },
    floralwhite: { r: 255, g: 250, b: 240 },
    forestgreen: { r: 34, g: 139, b: 34 },
    fuchsia: { r: 255, g: 0, b: 255 },
    gainsboro: { r: 220, g: 220, b: 220 },
    ghostwhite: { r: 248, g: 248, b: 255 },
    gold: { r: 255, g: 215, b: 0 },
    goldenrod: { r: 218, g: 165, b: 32 },
    gray: { r: 128, g: 128, b: 128 },
    green: { r: 0, g: 128, b: 0 },
    greenyellow: { r: 173, g: 255, b: 47 },
    grey: { r: 128, g: 128, b: 128 },
    honeydew: { r: 240, g: 255, b: 240 },
    hotpink: { r: 255, g: 105, b: 180 },
    indianred: { r: 205, g: 92, b: 92 },
    indigo: { r: 75, g: 0, b: 130 },
    ivory: { r: 255, g: 255, b: 240 },
    khaki: { r: 240, g: 230, b: 140 },
    lavender: { r: 230, g: 230, b: 250 },
    lavenderblush: { r: 255, g: 240, b: 245 },
    lawngreen: { r: 124, g: 252, b: 0 },
    lemonchiffon: { r: 255, g: 250, b: 205 },
    lightblue: { r: 173, g: 216, b: 230 },
    lightcoral: { r: 240, g: 128, b: 128 },
    lightcyan: { r: 224, g: 255, b: 255 },
    lightgoldenrodyellow: { r: 250, g: 250, b: 210 },
    lightgray: { r: 211, g: 211, b: 211 },
    lightgreen: { r: 144, g: 238, b: 144 },
    lightgrey: { r: 211, g: 211, b: 211 },
    lightpink: { r: 255, g: 182, b: 193 },
    lightsalmon: { r: 255, g: 160, b: 122 },
    lightseagreen: { r: 32, g: 178, b: 170 },
    lightskyblue: { r: 135, g: 206, b: 250 },
    lightslategray: { r: 119, g: 136, b: 153 },
    lightslategrey: { r: 119, g: 136, b: 153 },
    lightsteelblue: { r: 176, g: 196, b: 222 },
    lightyellow: { r: 255, g: 255, b: 224 },
    lime: { r: 0, g: 255, b: 0 },
    limegreen: { r: 50, g: 205, b: 50 },
    linen: { r: 250, g: 240, b: 230 },
    magenta: { r: 255, g: 0, b: 255 },
    maroon: { r: 128, g: 0, b: 0 },
    mediumaquamarine: { r: 102, g: 205, b: 170 },
    mediumblue: { r: 0, g: 0, b: 205 },
    mediumorchid: { r: 186, g: 85, b: 211 },
    mediumpurple: { r: 147, g: 112, b: 219 },
    mediumseagreen: { r: 60, g: 179, b: 113 },
    mediumslateblue: { r: 123, g: 104, b: 238 },
    mediumspringgreen: { r: 0, g: 250, b: 154 },
    mediumturquoise: { r: 72, g: 209, b: 204 },
    mediumvioletred: { r: 199, g: 21, b: 133 },
    midnightblue: { r: 25, g: 25, b: 112 },
    mintcream: { r: 245, g: 255, b: 250 },
    mistyrose: { r: 255, g: 228, b: 225 },
    moccasin: { r: 255, g: 228, b: 181 },
    navajowhite: { r: 255, g: 222, b: 173 },
    navy: { r: 0, g: 0, b: 128 },
    oldlace: { r: 253, g: 245, b: 230 },
    olive: { r: 128, g: 128, b: 0 },
    olivedrab: { r: 107, g: 142, b: 35 },
    orange: { r: 255, g: 165, b: 0 },
    orangered: { r: 255, g: 69, b: 0 },
    orchid: { r: 218, g: 112, b: 214 },
    palegoldenrod: { r: 238, g: 232, b: 170 },
    palegreen: { r: 152, g: 251, b: 152 },
    paleturquoise: { r: 175, g: 238, b: 238 },
    palevioletred: { r: 219, g: 112, b: 147 },
    papayawhip: { r: 255, g: 239, b: 213 },
    peachpuff: { r: 255, g: 218, b: 185 },
    peru: { r: 205, g: 133, b: 63 },
    pink: { r: 255, g: 192, b: 203 },
    plum: { r: 221, g: 160, b: 221 },
    powderblue: { r: 176, g: 224, b: 230 },
    purple: { r: 128, g: 0, b: 128 },
    rebeccapurple: { r: 102, g: 51, b: 153 },
    red: { r: 255, g: 0, b: 0 },
    rosybrown: { r: 188, g: 143, b: 143 },
    royalblue: { r: 65, g: 105, b: 225 },
    saddlebrown: { r: 139, g: 69, b: 19 },
    salmon: { r: 250, g: 128, b: 114 },
    sandybrown: { r: 244, g: 164, b: 96 },
    seagreen: { r: 46, g: 139, b: 87 },
    seashell: { r: 255, g: 245, b: 238 },
    sienna: { r: 160, g: 82, b: 45 },
    silver: { r: 192, g: 192, b: 192 },
    skyblue: { r: 135, g: 206, b: 235 },
    slateblue: { r: 106, g: 90, b: 205 },
    slategray: { r: 112, g: 128, b: 144 },
    slategrey: { r: 112, g: 128, b: 144 },
    snow: { r: 255, g: 250, b: 250 },
    springgreen: { r: 0, g: 255, b: 127 },
    steelblue: { r: 70, g: 130, b: 180 },
    tan: { r: 210, g: 180, b: 140 },
    teal: { r: 0, g: 128, b: 128 },
    thistle: { r: 216, g: 191, b: 216 },
    tomato: { r: 255, g: 99, b: 71 },
    turquoise: { r: 64, g: 224, b: 208 },
    violet: { r: 238, g: 130, b: 238 },
    wheat: { r: 245, g: 222, b: 179 },
    white: { r: 255, g: 255, b: 255 },
    whitesmoke: { r: 245, g: 245, b: 245 },
    yellow: { r: 255, g: 255, b: 0 },
    yellowgreen: { r: 154, g: 205, b: 50 },
};
// const regexRGB = /rgba?[(] ?(?<r>\d{1,3}) ?, ?(?<g>\d{1,3}) ?, ?(?<b>\d{1,3}) ?(, ?(?<a>\d([.]\d{1,2})?))?[)]/g;

/*
 ** Blend two colors or add a shade to color
 ** Colors can be:
 **      HEX => (#FFFFFF / #FFF)
 **      RGB => rgb(255,255,255)
 **      RGBA => rgba(255,255,255, 0.8)
 **
 ** Usage:
 **      shade => shadeBlendConvert(-0.5, "#FFF") // Makes #FFF 50% darker
 **      shade => shadeBlendConvert(0.5, "#000") // Makes #000 50% lighter
 **      shade => shadeBlendConvert(0.5, "#000", "c") // Makes #000 50% lighter and converts HEX to RGB
 **      blend => shadeBlendConvert(0.2, "rgb(0,0,0)", "rgb(0,200,0)") // rgb(0,0,0) + rgb(0,200,0) + 20% Blend will become rgb(0,40,0)
 **      blend => shadeBlendConvert(-0.2, "rgb(0,0,0)", "rgb(0,200,0)") // rgb(0,0,0) + rgb(0,200,0) + -20% Blend will become rgb(0,160,0)
 **      blend => shadeBlendConvert(0.75, "rgb(200,60,20)", "#67DAF0") // rgb(200,60,20) + #67DAF0 + 75% Blend will become #7fb3b9
 **
 */
export const shadeBlendConvert = function(p, from, to) {
    if (typeof p != 'number' || p < -1 || p > 1 || typeof from != 'string' || (from[0] != 'r' && from[0] != '#') || (to && typeof to != 'string')) return null; //ErrorCheck
    if (!this.sbcRip)
        this.sbcRip = d => {
            let l = d.length,
                RGB = {};
            if (l > 9) {
                d = d.split(',');
                if (d.length < 3 || d.length > 4) return null; //ErrorCheck
                (RGB[0] = i(d[0].split('(')[1])), (RGB[1] = i(d[1])), (RGB[2] = i(d[2])), (RGB[3] = d[3] ? parseFloat(d[3]) : -1);
            } else {
                if (l == 8 || l == 6 || l < 4) return null; //ErrorCheck
                if (l < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + '' + d[4] : ''); //3 or 4 digit
                (d = i(d.slice(1), 16)), (RGB[0] = (d >> 16) & 255), (RGB[1] = (d >> 8) & 255), (RGB[2] = d & 255), (RGB[3] = -1);
                if (l == 9 || l == 5) (RGB[3] = r((RGB[2] / 255) * 10000) / 10000), (RGB[2] = RGB[1]), (RGB[1] = RGB[0]), (RGB[0] = (d >> 24) & 255);
            }
            return RGB;
        };
    var i = parseInt,
        r = Math.round,
        h = from.length > 9,
        h = typeof to == 'string' ? (to.length > 9 ? true : to == 'c' ? !h : false) : h,
        b = p < 0,
        p = b ? p * -1 : p,
        to = to && to != 'c' ? to : b ? '#000000' : '#FFFFFF',
        f = this.sbcRip(from),
        t = this.sbcRip(to);
    if (!f || !t) return null; //ErrorCheck
    if (h)
        return (
            'rgb' +
            (f[3] > -1 || t[3] > -1 ? 'a(' : '(') +
            r((t[0] - f[0]) * p + f[0]) +
            ',' +
            r((t[1] - f[1]) * p + f[1]) +
            ',' +
            r((t[2] - f[2]) * p + f[2]) +
            (f[3] < 0 && t[3] < 0 ? ')' : ',' + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) + ')')
        );
    else
        return (
            '#' +
            (
                0x100000000 +
                r((t[0] - f[0]) * p + f[0]) * 0x1000000 +
                r((t[1] - f[1]) * p + f[1]) * 0x10000 +
                r((t[2] - f[2]) * p + f[2]) * 0x100 +
                (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255)
            )
                .toString(16)
                .slice(1, f[3] > -1 || t[3] > -1 ? undefined : -2)
        );
};

// HEX or HEX Alpha to RGB
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

// HSL or HSL Alpha to RGB
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
function checkColor(color) {
    if (typeof color === 'string') {
        if (color in colors) return colors[color.toLowerCase()];
        else if (color[0] === '#') return hexToRGB(color);
        else if (!!~color.indexOf('hsl')) return hslToRGB(color);
        else if (!!~color.indexOf('rgba')) return rgbaToRGB(color);
        else if (!!~color.indexOf('rgb')) return rgbToRGB(color);
    }
}

export function setContrast(color) {
    const c = checkColor(color);
    const RGB = typeof c === 'object' ? c : { r: '255', g: '255', b: '255' };

    // https://www.w3.org/TR/AERT/#color-contrast
    const o = Math.round((RGB.r * 299 + RGB.g * 587 + RGB.b * 114) / 1000);
    return o > 175 ? gray.darkest : '#FFF';
    // return o > 125 ? gray.darker : "#FFF";
}

export const normalizeFont = size => {
    if (pixelRatio === 2) {
        // iphone 5s and older Androids
        if (deviceWidth < 360) return size * 0.95;
        // iphone 5
        if (deviceHeight < 667) return size;
        // iphone 6-6s
        else if (deviceHeight >= 667 && deviceHeight <= 735) return size * 1.15;
        // older phablets
        return size * 1.25;
    }
    if (pixelRatio === 3) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) return size;
        // Catch other weird android width sizings
        if (deviceHeight < 667) return size * 1.15;
        // catch in-between size Androids and scale font up
        if (deviceHeight >= 667 && deviceHeight <= 735) return size * 1.2;
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note
        return size * 1.27;
    }
    if (pixelRatio === 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) return size;
        // Catch other smaller android height sizings
        if (deviceHeight < 667) return size * 1.2;
        // catch in-between size Androids and scale font up
        if (deviceHeight >= 667 && deviceHeight <= 735) return size * 1.25;
        // catch larger phablet devices
        return size * 1.4;
    }
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size;
};
