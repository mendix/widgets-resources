import { AttributeTypes, Property, WidgetXml } from "./WidgetXml";
import { extractProperties, toClientType } from "./xmlHelpers";

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

    const enumTypes = Array.of<string>();
    const clientTypes = properties
        .map((prop) => {
            const isOptional = (prop.$.required === "false" && prop.$.type !== "object") || prop.$.type === "action";
            return `    ${prop.$.key}${isOptional ? "?" : ""}: ${generateClientType(prop, enumTypes, isNative)};`;
        })
        .join("\n");

    const modelerTypes = properties.map((prop) => `    ${prop.$.key}?: ${generateModelerType(prop)};`).join("\n");

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
    ].filter((type) => new RegExp(`\\W${type}\\W`).test(clientTypes));
    const reactImports = Array.of<string>()
        .concat(/\WComponent\W/.test(modelerTypes) ? ["Component"] : [])
        .concat(!isNative ? ["CSSProperties"] : [])
        .concat(/\WReactNode\W/.test(clientTypes) ? ["ReactNode"] : []);
    return `/**
 * This file was generated from ${widgetName}.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { ${reactImports.join(", ")} } from "react";
import { ${mxImports.join(", ")} } from "mendix";

export interface ${isNative ? widgetName : widgetName + "Container"}Props${isNative ? "<Style>" : ""} {
    name: string;
${
    !isNative
        ? `class: string;
    style?: CSSProperties;`
        : `style: Style[];`
}
    tabIndex: number;
    ${clientTypes}
}

export interface ${widgetName}PreviewProps {
    class: string;
    style: string;
    ${modelerTypes}
}

${!isNative ? `export interface VisibilityMap ${generateVisibilityMap(properties, "")}` : ""}
`;
}

function generateClientType(prop: Property, enumTypes: string[], isNative: boolean): string {
    switch (prop.$.type) {
        case "boolean":
            return "boolean";
        case "string":
            return "string";
        case "action":
            return "ActionValue";
        case "textTemplate":
            return "DynamicValue<string>";
        case "integer":
        case "decimal":
            return "BigJs.Big";
        case "icon":
            return isNative ? "DynamicValue<NativeIcon>" : "DynamicValue<WebIcon>";
        case "image":
            return isNative ? "DynamicValue<NativeImage>" : "DynamicValue<WebImage>";
        case "file":
            return "DynamicValue<FileValue>";
        case "datasource":
            return "ListValue";
        case "attribute":
            if (!prop.attributeTypes || prop.attributeTypes.length === 0) {
                throw new Error("[XML] Attribute property requires attributeTypes element");
            }
            return `EditableValue<${toClientTypes(prop.attributeTypes[0])}>`;
        case "expression":
            if (!prop.returnType || prop.returnType.length === 0) {
                throw new Error("[XML] Expression property requires returnType element");
            }
            return `DynamicValue<${toClientType(prop.returnType[0].$.type)}>`;
        case "enumeration":
            return generateEnums(prop, enumTypes);
        case "object":
            const childType = capitalizeFirstLetter(prop.$.key) + "Type";
            // todo
            return prop.$.isList === "true" ? `${childType}}[]` : childType;
        case "widgets":
            return !!prop.$.dataSource ? "(item: ObjectItem) => ReactNode" : "ReactNode";
        default:
            return "any";
    }
}

function generateModelerType(prop: Property): string {
    switch (prop.$.type) {
        case "boolean":
            return "boolean";
        case "string":
            return "string";
        case "action":
            return "{}";
        case "textTemplate":
            return "string";
        case "integer":
        case "decimal":
            return "number";
        case "icon":
            return "IconProperty";
        case "image":
            return "ImageProperty";
        case "file":
            return "string";
        case "datasource":
            return "ListValue"; // todo
        case "attribute":
        case "expression":
        case "enumeration":
            return "string";
        case "object":
            const childType = capitalizeFirstLetter(prop.$.key) + "PreviewType";
            // todo
            return prop.$.isList === "true" ? `${childType}}[]` : childType;
        case "widgets":
            return "({ widgetCount: number; renderer: Component<{}> })";
        default:
            return "any";
    }
}

function generateEnums(prop: Property, childTypes: string[]): string {
    if (!prop.enumerationValues?.length || !prop.enumerationValues[0].enumerationValue?.length) {
        throw new Error("[XML] Enumeration property requires enumerations element");
    }
    const typeName = capitalizeFirstLetter(prop.$.key) + "Enum";
    const members = prop.enumerationValues[0].enumerationValue.map((type) => `"${type.$.key}"`);
    childTypes.push(`export type ${typeName} = ${members.join(" | ")};`);
    return typeName;
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
        `${indent}}`
    );
}

function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function toClientTypes(attributeTypes: AttributeTypes): string {
    if (!attributeTypes.attributeType?.length) {
        throw new Error("[XML] Attribute property requires attributeTypes element");
    }
    const types = attributeTypes.attributeType
        .filter((type) => type.$ && type.$.name)
        .map((type) => toClientType(type.$.name));
    return Array.from(new Set(types)).join(` | `);
}
