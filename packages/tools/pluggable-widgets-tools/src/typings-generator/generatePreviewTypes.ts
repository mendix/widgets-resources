import { Property } from "./WidgetXml";
import { capitalizeFirstLetter, extractProperties } from "./helpers";

export function generatePreviewTypes(widgetName: string, properties: Property[]): string[] {
    const results = Array.of<string>();
    results.push(`export interface ${widgetName}PreviewProps {
    class: string;
    style: string;
${generatePreviewTypeBody(properties, results)}
}`);
    return results;
}

function generatePreviewTypeBody(properties: Property[], generatedTypes: string[]) {
    return properties.map(prop => `    ${prop.$.key}: ${toPreviewPropType(prop, generatedTypes)};`).join("\n");
}

function toPreviewPropType(prop: Property, generatedTypes: string[]): string {
    switch (prop.$.type) {
        case "boolean":
            return "boolean";
        case "string":
            return "string";
        case "action":
            return "{} | null";
        case "textTemplate":
            return "string";
        case "integer":
        case "decimal":
            return "number | null";
        case "icon":
            return '{ type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null';
        case "image":
            return '{ type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null';
        case "file":
            return "string";
        case "datasource":
            // { type: string } is included here due to an incorrect API output before 9.2 (PAG-1400)
            return "{} | { type: string } | null";
        case "attribute":
        case "expression":
            return "string";
        case "enumeration":
            return capitalizeFirstLetter(prop.$.key) + "Enum";
        case "object":
            if (!prop.properties?.length) {
                throw new Error("[XML] Object property requires properties element");
            }
            const childType = capitalizeFirstLetter(prop.$.key) + "PreviewType";
            generatedTypes.push(
                `export interface ${childType} {
${generatePreviewTypeBody(extractProperties(prop.properties[0]), generatedTypes)}
}`
            );
            return prop.$.isList === "true" ? `${childType}[]` : childType;
        case "widgets":
            return "{ widgetCount: number; renderer: ComponentType<{ caption?: string }> }";
        default:
            return "any";
    }
}
