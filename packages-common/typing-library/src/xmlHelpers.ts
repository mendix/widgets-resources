import { Properties, Property } from "./WidgetXml";

export function extractProperties(propElements: Properties): Property[] {
    if (!propElements.propertyGroup) {
        return propElements.property ?? [];
    }

    return (propElements.propertyGroup ?? []).map((pg) => extractProperties(pg)).reduce((a, e) => a.concat(e), []);
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
            return "BigJs.Big";
        case "HashString":
        case "String":
        case "Enum":
            return "string";
        default:
            return "any";
    }
}
