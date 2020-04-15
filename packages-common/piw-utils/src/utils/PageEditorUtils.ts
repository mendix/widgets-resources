/* eslint-disable */
/**
 * TODO: Include tests for methods
 */
import { Property, PropertyGroup } from "../typings";

declare type Option<T> = T | undefined;

export function hidePropertyIn<T, TKey extends keyof T>(propertyGroups: PropertyGroup[], _value: T, key: TKey): void;
export function hidePropertyIn<T, TKey extends keyof T>(
    propertyGroups: PropertyGroup[],
    _value: T,
    key: TKey,
    nestedPropIndex: number,
    nestedPropKey: T[TKey] extends Array<infer TChild> ? keyof TChild : never
): void;
export function hidePropertyIn<T, TKey extends keyof T>(
    propertyGroups: PropertyGroup[],
    _value: T,
    key: TKey,
    nestedPropIndex?: number,
    nestedPropKey?: T[TKey] extends Array<infer TChild> ? keyof TChild : never
): void {
    modifyProperty(
        (_, index, container) => container.splice(index, 1),
        propertyGroups,
        key,
        nestedPropIndex,
        nestedPropKey
    );
}

export function hidePropertiesIn<T>(propertyGroups: PropertyGroup[], _value: T, keys: Array<keyof T>): void {
    keys.forEach(key =>
        modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined)
    );
}

export function changePropertyIn<T, TKey extends keyof T>(
    propertyGroups: PropertyGroup[],
    _value: T,
    modify: (prop: Property) => void,
    key: TKey
): void;
export function changePropertyIn<T, TKey extends keyof T>(
    propertyGroups: PropertyGroup[],
    _value: T,
    modify: (prop: Property) => void,
    key: TKey,
    nestedPropIndex: number,
    nestedPropKey: string
): void;
export function changePropertyIn<T, TKey extends keyof T>(
    propertyGroups: PropertyGroup[],
    _value: T,
    modify: (prop: Property) => void,
    key: TKey,
    nestedPropIndex?: number,
    nestedPropKey?: string
): void {
    modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}

function modifyProperty(
    modify: (prop: Property, index: number, container: Property[]) => void,
    propertyGroups: PropertyGroup[],
    key: string | number | symbol,
    nestedPropIndex?: number,
    nestedPropKey?: string | number | symbol
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
