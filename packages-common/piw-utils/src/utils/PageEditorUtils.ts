/* eslint-disable */
/**
 * TODO: Include tests for methods
 */
import { Property, PropertyGroup } from "../typings";

declare type Option<T> = T | undefined;

export function hidePropertyIn<T>(propertyGroups: PropertyGroup[], key: keyof T): void;
export function hidePropertyIn<T>(
    propertyGroups: PropertyGroup[],
    key: keyof T,
    nestedPropIndex: number,
    nestedPropKey: string
): void;
export function hidePropertyIn<T>(
    propertyGroups: PropertyGroup[],
    key: keyof T,
    nestedPropIndex?: number,
    nestedPropKey?: string
): void {
    modifyProperty(
        (_, index, container) => container.splice(index, 1),
        propertyGroups,
        key,
        nestedPropIndex,
        nestedPropKey
    );
}

export function hidePropertiesIn<T>(propertyGroups: PropertyGroup[], keys: Array<keyof T>): void {
    keys.forEach(key =>
        modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined)
    );
}

export function changePropertyIn<T>(
    propertyGroups: PropertyGroup[],
    modify: (prop: Property) => void,
    key: keyof T
): void;
export function changePropertyIn<T>(
    propertyGroups: PropertyGroup[],
    modify: (prop: Property) => void,
    key: keyof T,
    nestedPropIndex: number,
    nestedPropKey: string
): void;
export function changePropertyIn<T>(
    propertyGroups: PropertyGroup[],
    modify: (prop: Property) => void,
    key: keyof T,
    nestedPropIndex?: number,
    nestedPropKey?: string
): void {
    modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}

function modifyProperty<T>(
    modify: (prop: Property, index: number, container: Property[]) => void,
    propertyGroups: PropertyGroup[],
    key: keyof T,
    nestedPropIndex?: number,
    nestedPropKey?: string
) {
    propertyGroups.forEach(propGroup => {
        if (propGroup.propertyGroups) {
            modifyProperty(modify, propGroup.propertyGroups, key, nestedPropIndex, nestedPropKey);
        }

        propGroup.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                if (nestedPropIndex === undefined || nestedPropKey === undefined) {
                    modify(prop, index, array);
                } else {
                    if (!prop.properties) {
                        throw new Error("Wrong parameters");
                    }
                    modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
                }
            }
        });
    });
}
