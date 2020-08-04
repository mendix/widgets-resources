import { Properties, Property } from "./WidgetXml";

export function extractProperties(propElements: Properties): Property[] {
    if (!propElements.propertyGroup) {
        return propElements.property ?? [];
    }

    return (propElements.propertyGroup ?? []).map(pg => extractProperties(pg)).reduce((a, e) => a.concat(e), []);
}

export function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
