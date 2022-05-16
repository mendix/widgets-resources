import React from "react";

export function convertInlineCssToReactStyle(inlineStyle: string): React.CSSProperties {
    const keyValuePairs = inlineStyle
        .split(";") // split by ;
        .filter(r => r.length) // remote empty entries
        .map(r => r.split(":").map(v => v.trim()))
        .filter(v => v.length === 2 && v[0].length && v[1].length) as Array<[string, string]>;

    const style = keyValuePairs.reduce((style, [key, value]) => {
        style[convertStylePropNameToReactPropName(key)] = value;
        return style;
    }, {} as Record<string, string>);

    return style;
}

function convertStylePropNameToReactPropName(cssPropName: string): string {
    if (cssPropName.startsWith("--")) {
        // css var, don't change
        return cssPropName;
    }
    const prop = cssPropName.replace(/(-.)/g, v => v[1].toUpperCase());
    if (cssPropName.startsWith("-ms")) {
        // custom browser prefix is ms, lower case
        return prop[0].toLowerCase() + prop.slice(1);
    }

    return prop;
}
