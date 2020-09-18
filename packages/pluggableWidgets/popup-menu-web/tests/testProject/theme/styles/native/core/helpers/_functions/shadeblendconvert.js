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
 *
 */
export function shadeBlendConvert(c, fromValue, toValue = undefined) {
    if (typeof c != "number" ||
        c < -1 ||
        c > 1 ||
        typeof fromValue != "string" ||
        (fromValue[0] != "r" && fromValue[0] != "#") ||
        (toValue && typeof toValue != "string"))
        return "red"; //ErrorCheck
    const sbcRip = (value) => {
        const l = value.length, RGB = [];
        if (l > 9) {
            const d = value.split(",");
            if (d.length < 3 || d.length > 4)
                return null; //ErrorCheck
            (RGB[0] = i(d[0].split("(")[1])),
                (RGB[1] = i(d[1])),
                (RGB[2] = i(d[2])),
                (RGB[3] = d[3] ? parseFloat(d[3]) : -1);
        }
        else {
            let hex = "";
            if (l == 8 || l == 6 || l < 4)
                return null; //ErrorCheck
            if (l == 4 || l == 5)
                hex = "#" + value[1] + value[1] + value[2] + value[2] + value[3] + value[3] + (l > 4 ? value[4] + "" + value[4] : ""); //3 or 4 digit
            let d = i(hex.slice(1), 16);
            RGB[0] = (d >> 16) & 255;
            RGB[1] = (d >> 8) & 255;
            RGB[2] = d & 255;
            RGB[3] = -1;
            if (l == 9 || l == 5) {
                RGB[3] = r((RGB[2] / 255) * 10000) / 10000;
                RGB[2] = RGB[1];
                RGB[1] = RGB[0];
                RGB[0] = (d >> 24) & 255;
            }
        }
        return RGB;
    };
    let i = parseInt, r = Math.round, th = fromValue.length > 9, h = typeof toValue == "string" ? (toValue.length > 9 ? true : toValue == "c" ? !th : false) : th, b = c < 0, p = b ? c * -1 : c, to = toValue && toValue != "c" ? toValue : b ? "#000000" : "#FFFFFF", f = sbcRip(fromValue), t = sbcRip(to);
    if (!f || !t)
        return "red"; //ErrorCheck
    if (h)
        return ("rgb" +
            (f[3] > -1 || t[3] > -1 ? "a(" : "(") +
            r((t[0] - f[0]) * p + f[0]) +
            "," +
            r((t[1] - f[1]) * p + f[1]) +
            "," +
            r((t[2] - f[2]) * p + f[2]) +
            (f[3] < 0 && t[3] < 0
                ? ")"
                : "," +
                    (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) +
                    ")"));
    else
        return ("#" +
            (0x100000000 +
                r((t[0] - f[0]) * p + f[0]) * 0x1000000 +
                r((t[1] - f[1]) * p + f[1]) * 0x10000 +
                r((t[2] - f[2]) * p + f[2]) * 0x100 +
                (f[3] > -1 && t[3] > -1
                    ? r(((t[3] - f[3]) * p + f[3]) * 255)
                    : t[3] > -1
                        ? r(t[3] * 255)
                        : f[3] > -1
                            ? r(f[3] * 255)
                            : 255))
                .toString(16)
                .slice(1, f[3] > -1 || t[3] > -1 ? undefined : -2));
}
