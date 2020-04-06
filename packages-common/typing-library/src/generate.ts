import { generateClientTypes } from "./generateClientTypes";
import { generatePreviewTypes } from "./generatePreviewTypes";
import { extractProperties } from "./helpers";
import { Property, WidgetXml } from "./WidgetXml";

export function generateForWidget(widgetXml: WidgetXml, widgetName: string) {
    if (!widgetXml?.widget?.properties) {
        throw new Error("[XML] XML doesn't contains <properties> element");
    }
    if (widgetXml.widget.$.pluginWidget !== "true") {
        throw new Error("[XML] Attribute pluginWidget=true not found. Please review your XML");
    }

    const isNative = widgetXml.widget.$.supportedPlatform === "Native";

    const properties = (widgetXml.widget.properties.length > 0
        ? extractProperties(widgetXml.widget.properties[0])
        : []
    ).filter((prop) => prop && prop.$ && prop.$.key);

    const clientTypes = generateClientTypes(widgetName, properties, isNative);
    const modelerTypes = generatePreviewTypes(widgetName, properties);
    const visibiltyMap = `export interface VisibilityMap ${generateVisibilityMap(properties, "")}`;
    const allTypes = clientTypes
        .slice(0, clientTypes.length - 1) // all client auxiliary types
        .concat(modelerTypes.slice(0, modelerTypes.length - 1)) // all preview auxiliary types
        .concat([clientTypes[clientTypes.length - 1], modelerTypes[modelerTypes.length - 1]])
        .concat(!isNative ? [visibiltyMap] : [])
        .join("\n\n");

    const mxImports = [
        "ActionValue",
        "DynamicValue",
        "EditableValue",
        "FileValue",
        "ListValue",
        "NativeIcon",
        "NativeImage",
        "ObjectItem",
        "WebIcon",
        "WebImage",
    ].filter((type) => new RegExp(`\\W${type}\\W`).test(allTypes));
    const reactImports = Array.of<string>()
        .concat(/\WComponent\W/.test(allTypes) ? ["Component"] : [])
        .concat(!isNative ? ["CSSProperties"] : [])
        .concat(/\WReactNode\W/.test(allTypes) ? ["ReactNode"] : []);
    const imports = [
        `import { ${reactImports.join(", ")} } from "react";`,
        `import { ${mxImports.join(", ")} } from "mendix";`,
    ]
        .filter((line) => line.indexOf("{  }") === -1)
        .join("\n");

    return `/**
 * This file was generated from ${widgetName}.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
${imports.length ? imports + "\n\n" : ""}${allTypes}
`;
}

function generateVisibilityMap(properties: Property[], indent: string): string {
    return (
        "{\n" +
        properties
            .map((prop) => {
                if (prop.$.type !== "object") {
                    return `${indent}    ${prop.$.key}: boolean;`;
                } else {
                    return `${indent}    ${prop.$.key}: boolean | Array<${generateVisibilityMap(
                        extractProperties(prop.properties![0]),
                        indent + "    "
                    )}>;`;
                }
            })
            .join("\n") +
        `\n${indent}}`
    );
}
