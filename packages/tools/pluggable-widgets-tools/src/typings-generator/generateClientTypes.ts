import { Property, SystemProperty } from "./WidgetXml";
import { capitalizeFirstLetter, extractProperties } from "./helpers";

export function generateClientTypes(
    widgetName: string,
    properties: Property[],
    systemProperties: SystemProperty[],
    isNative: boolean
): string[] {
    function resolveProp(key: string) {
        return properties.find(p => p.$.key === key);
    }

    const isLabeled = systemProperties.some(p => p.$.key === "Label");
    const results = Array.of<string>();
    results.push(
        isNative
            ? `export interface ${widgetName}Props<Style> {
    name: string;
    style: Style[];
${generateClientTypeBody(properties, true, results, resolveProp)}
}`
            : `export interface ${widgetName}ContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;${
        isLabeled
            ? `
    id: string;`
            : ``
    }
${generateClientTypeBody(properties, false, results, resolveProp)}
}`
    );
    return results;
}

function generateClientTypeBody(
    properties: Property[],
    isNative: boolean,
    generatedTypes: string[],
    resolveProp: (key: string) => Property | undefined
) {
    return properties
        .map(prop => {
            const isOptional =
                prop.$.type !== "string" &&
                ((prop.$.required === "false" && prop.$.type !== "object") || prop.$.type === "action");
            return `    ${prop.$.key}${isOptional ? "?" : ""}: ${toClientPropType(
                prop,
                isNative,
                generatedTypes,
                resolveProp
            )};`;
        })
        .join("\n");
}

function toClientPropType(
    prop: Property,
    isNative: boolean,
    generatedTypes: string[],
    resolveProp: (key: string) => Property | undefined
) {
    switch (prop.$.type) {
        case "boolean":
            return "boolean";
        case "string":
            return "string";
        case "action":
            return toLinkableType(prop, "ListActionValue", "ActionValue", resolveProp);
        case "textTemplate":
            return toLinkableType(prop, "ListExpressionValue<string>", "DynamicValue<string>", resolveProp);
        case "integer":
            return "number";
        case "decimal":
            return "Big";
        case "icon":
            return isNative ? "DynamicValue<NativeIcon>" : "DynamicValue<WebIcon>";
        case "image":
            return isNative ? "DynamicValue<NativeImage>" : "DynamicValue<WebImage>";
        case "file":
            return "DynamicValue<FileValue>";
        case "datasource":
            return "ListValue";
        case "attribute":
            if (!prop.attributeTypes?.length) {
                throw new Error("[XML] Attribute property requires attributeTypes element");
            }
            const types = prop.attributeTypes
                .map(ats => ats.attributeType)
                .reduce((a, i) => a.concat(i), [])
                .map(at => toClientType(at.$.name));
            const uniqueTypes = Array.from(new Set(types));
            return toLinkableType(
                prop,
                `ListAttributeValue<${uniqueTypes.join(" | ")}>`,
                `EditableValue<${uniqueTypes.join(" | ")}>`,
                resolveProp
            );
        case "expression":
            if (!prop.returnType || prop.returnType.length === 0) {
                throw new Error("[XML] Expression property requires returnType element");
            }
            const type = toClientType(prop.returnType[0].$.type);
            return toLinkableType(prop, `ListExpressionValue<${type}>`, `DynamicValue<${type}>`, resolveProp);
        case "enumeration":
            const typeName = capitalizeFirstLetter(prop.$.key) + "Enum";
            generatedTypes.push(generateEnum(typeName, prop));
            return typeName;
        case "object":
            if (!prop.properties?.length) {
                throw new Error("[XML] Object property requires properties element");
            }
            const childType = capitalizeFirstLetter(prop.$.key) + "Type";
            const childProperties = extractProperties(prop.properties[0]);

            const resolveChildProp = (key: string) =>
                key.startsWith("../") ? resolveProp(key.substring(3)) : childProperties.find(p => p.$.key === key);

            generatedTypes.push(
                `export interface ${childType} {
${generateClientTypeBody(childProperties, isNative, generatedTypes, resolveChildProp)}
}`
            );
            return prop.$.isList === "true" ? `${childType}[]` : childType;
        case "widgets":
            return toLinkableType(prop, "ListWidgetValue", "ReactNode", resolveProp);
        default:
            return "any";
    }
}

function toLinkableType(
    prop: Property,
    linkedType: string,
    nonLinkedType: string,
    resolveProp: (name: string) => Property | undefined
) {
    const dataSource = prop.$.dataSource && resolveProp(prop.$.dataSource);
    return dataSource
        ? dataSource.$.required !== "false"
            ? linkedType
            : `${linkedType} | ${nonLinkedType}`
        : nonLinkedType;
}

function generateEnum(typeName: string, prop: Property) {
    if (!prop.enumerationValues?.length || !prop.enumerationValues[0].enumerationValue?.length) {
        throw new Error("[XML] Enumeration property requires enumerations element");
    }
    const members = prop.enumerationValues[0].enumerationValue.map(type => `"${type.$.key}"`);
    return `export type ${typeName} = ${members.join(" | ")};`;
}

export function toClientType(xmlType: string): string {
    switch (xmlType) {
        case "Boolean":
            return "boolean";
        case "DateTime":
            return "Date";
        case "AutoNumber":
        case "Decimal":
        case "Integer":
        case "Long":
            return "Big";
        case "HashString":
        case "String":
        case "Enum":
            return "string";
        default:
            return "any";
    }
}
