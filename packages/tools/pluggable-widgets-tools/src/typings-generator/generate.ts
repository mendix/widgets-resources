import { generateClientTypes } from "./generateClientTypes";
import { generatePreviewTypes } from "./generatePreviewTypes";
import { extractProperties } from "./helpers";
import { WidgetXml } from "./WidgetXml";

const mxExports = [
    "ActionValue",
    "DynamicValue",
    "EditableValue",
    "FileValue",
    "ListValue",
    "NativeIcon",
    "NativeImage",
    "ListActionValue",
    "ListAttributeValue",
    "ListExpressionValue",
    "ListWidgetValue",
    "WebIcon",
    "WebImage"
];

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
    ).filter(prop => prop && prop.$ && prop.$.key);

    const clientTypes = generateClientTypes(widgetName, properties, isNative);
    const modelerTypes = generatePreviewTypes(widgetName, properties);

    const generatedTypesCode = clientTypes
        .slice(0, clientTypes.length - 1) // all client auxiliary types
        .concat(modelerTypes.slice(0, modelerTypes.length - 1)) // all preview auxiliary types
        .concat([clientTypes[clientTypes.length - 1], modelerTypes[modelerTypes.length - 1]])
        .join("\n\n");

    const imports = [
        generateImport("react", generatedTypesCode, ["ComponentType", "CSSProperties", "ReactNode"]),
        generateImport("mendix", generatedTypesCode, mxExports)
    ]
        .filter(line => line)
        .join("\n");

    return `/**
 * This file was generated from ${widgetName}.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
${imports.length ? imports + "\n\n" : ""}${generatedTypesCode}
`;
}

function generateImport(from: string, code: string, availableNames: string[]) {
    const usedNames = availableNames.filter(type => new RegExp(`\\W${type}\\W`).test(code));
    return usedNames.length ? `import { ${usedNames.join(", ")} } from "${from}";` : "";
}
