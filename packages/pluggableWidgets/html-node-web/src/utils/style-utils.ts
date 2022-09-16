import React from "react";

export function convertInlineCssToReactStyle(inlineStyle: string): React.CSSProperties {
    return Object.fromEntries(
        inlineStyle
            .split(";") // split by ;
            .filter(r => r.length) // filter out empty
            .map(r => r.split(":").map(v => v.trim())) // split by key and value by :
            .filter(v => v.length === 2 && v[0].length && v[1].length) // filter out broken lines
            .map(([key, value]) => [convertStylePropNameToReactPropName(key), value] as [string, string])
    );
}

function convertStylePropNameToReactPropName(cssPropName: string): string {
    if (cssPropName.startsWith("--")) {
        // custom css var, don't do any manipulations
        return cssPropName;
    }
    const prop = cssPropName.replace(/(-.)/g, v => v[1].toUpperCase());
    if (cssPropName.startsWith("-ms")) {
        // custom browser prefix is ms, lower case
        return prop[0].toLowerCase() + prop.slice(1);
    }

    return prop;
}
