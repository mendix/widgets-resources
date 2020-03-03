import { Properties, Property } from "../../typings/PageEditor";

declare type Option<T> = T | undefined;

export function hideProperty<T>(key: keyof T, properties?: Option<Properties>): void {
    properties?.forEach(property => {
        property?.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                array.splice(index, 1);
            } else {
                prop.properties?.forEach(propArray => hideProperty(key, propArray));
            }
        });
        hideProperty(key, property.propertyGroups);
    });
}

export function includeKey<T>(key: keyof T, properties: Option<Properties>, newItem: Property, after = true): void {
    properties?.forEach(property => {
        property?.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                if (!array.some(p => p.key === newItem.key)) {
                    array.splice(after ? index : index - 1, 0, newItem);
                }
            } else {
                prop.properties?.forEach(propArray => includeKey(key, propArray, newItem));
            }
        });
        includeKey(key, property.propertyGroups, newItem);
    });
}

export function changeProperty<T>(
    key: keyof T,
    targetKey: keyof Property,
    value: any,
    properties: Option<Properties>
): void {
    properties?.forEach(property => {
        property?.properties?.forEach(prop => {
            if (prop.key === key) {
                prop[targetKey] = value;
            } else {
                prop.properties?.forEach(propArray => changeProperty(key, targetKey, value, propArray));
            }
        });
        changeProperty(key, targetKey, value, property.propertyGroups);
    });
}
