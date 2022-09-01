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
    name: string;${
        !isLabeled
            ? `
    class: string;
    style?: CSSProperties;`
            : ""
    }
    tabIndex?: number;${
        isLabeled
            ? `
    id: string;`
            : ""
    }
${generateClientTypeBody(properties, false, results, resolveProp)}
}`
    );
    return results;
}

function actionIsLinkedInAnAttribute(propertyPath: string, properties: Property[]): boolean {
    return properties.some(prop => {
        if (prop.$.type === "attribute" && prop.$.onChange === propertyPath) {
            return true;
        }
        if (prop.$.type === "object" && prop.properties && prop.properties.length > 0) {
            return prop.properties.some(prop =>
                actionIsLinkedInAnAttribute(`../${propertyPath}`, extractProperties(prop))
            );
        }
        return false;
    });
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
                ((prop.$.required === "false" && prop.$.type !== "object") ||
                    prop.$.type === "action" ||
                    (prop.$.dataSource && resolveProp(prop.$.dataSource)?.$.required === "false"));

            if (prop.$.type === "action" && actionIsLinkedInAnAttribute(prop.$.key, properties)) {
                return undefined;
            }

            return `    ${prop.$.key}${isOptional ? "?" : ""}: ${toClientPropType(
                prop,
                isNative,
                generatedTypes,
                resolveProp
            )};`;
        })
        .filter(Boolean)
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
            return prop.$.dataSource ? "ListActionValue" : "ActionValue";
        case "textTemplate":
            return prop.$.dataSource ? "ListExpressionValue<string>" : "DynamicValue<string>";
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
        case "attribute": {
            if (!prop.attributeTypes?.length) {
                throw new Error("[XML] Attribute property requires attributeTypes element");
            }
            const types = prop.attributeTypes
                .map(ats => ats.attributeType)
                .reduce((a, i) => a.concat(i), [])
                .map(at => toAttributeClientType(at.$.name));
            const uniqueTypes = Array.from(new Set(types));
            return prop.$.dataSource
                ? `ListAttributeValue<${uniqueTypes.join(" | ")}>`
                : `EditableValue<${uniqueTypes.join(" | ")}>`;
        }
        case "association": {
            if (!prop.associationTypes?.length) {
                throw new Error("[XML] Association property requires associationTypes element");
            }
            const types = prop.associationTypes
                .map(ats => ats.associationType)
                .reduce((a, i) => a.concat(i), [])
                .map(at => toAssociationOutputType(at.$.name, !!prop.$.dataSource));
            const uniqueTypes = Array.from(new Set(types));
            return uniqueTypes.join(" | ");
        }
        case "expression":
            if (!prop.returnType || prop.returnType.length === 0) {
                throw new Error("[XML] Expression property requires returnType element");
            }
            const type = toAttributeClientType(prop.returnType[0].$.type);
            return prop.$.dataSource ? `ListExpressionValue<${type}>` : `DynamicValue<${type}>`;
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
            return prop.$.dataSource ? "ListWidgetValue" : "ReactNode";
        default:
            return "any";
    }
}

function generateEnum(typeName: string, prop: Property) {
    if (!prop.enumerationValues?.length || !prop.enumerationValues[0].enumerationValue?.length) {
        throw new Error("[XML] Enumeration property requires enumerations element");
    }
    const members = prop.enumerationValues[0].enumerationValue.map(type => `"${type.$.key}"`);
    return `export type ${typeName} = ${members.join(" | ")};`;
}

export function toAttributeClientType(xmlType: string): string {
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

export function toAssociationOutputType(xmlType: string, linkedToDataSource: boolean) {
    switch (xmlType) {
        case "Reference":
            return linkedToDataSource ? "ListReferenceValue" : "ReferenceValue";
        case "ReferenceSet":
            return linkedToDataSource ? "ListReferenceSetValue" : "ReferenceSetValue";
        default:
            return "any";
    }
}
