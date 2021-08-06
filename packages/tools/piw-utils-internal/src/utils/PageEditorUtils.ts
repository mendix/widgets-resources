/* eslint-disable */
/**
 * TODO: Include tests for methods
 */
import { Properties, Property, PropertyGroup } from "../typings";

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

export function hideNestedPropertiesIn<T, TKey extends keyof T>(
    propertyGroups: Properties,
    _value: T,
    key: TKey,
    nestedPropIndex: number,
    nestedPropKeys: Array<T[TKey] extends Array<infer TChild> ? keyof TChild : never>
): void {
    nestedPropKeys.forEach(nestedKey => hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedKey));
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

export function transformGroupsIntoTabs(properties: Properties) {
    const groups: PropertyGroup[] = [];
    properties.forEach(property => {
        if (property.propertyGroups) {
            groups.push(...property.propertyGroups);
            property.propertyGroups = [];
        }
    });
    properties.push(...groups);
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
                } else if (prop.objects) {
                    modifyProperty(modify, prop.objects[nestedPropIndex].properties, nestedPropKey);
                } else if (prop.properties) {
                    modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
                }
            }
        });
    });
}

export function moveProperty(fromIndex: number, toIndex: number, properties: Properties): void {
    if (fromIndex >= 0 && toIndex >= 0 && fromIndex < properties.length && toIndex < properties.length) {
        const elementToMove = properties[fromIndex];

        const isMoveForward = toIndex - fromIndex >= 0;
        const maxIndexStep = isMoveForward ? toIndex - fromIndex : fromIndex - toIndex;
        const getNextIndex = (currentIndex: number): number => currentIndex + (isMoveForward ? +1 : -1);
        const getCurrentIndex = (indexStep: number): number => fromIndex + (isMoveForward ? +indexStep : -indexStep);

        for (let indexStep = 0; indexStep <= maxIndexStep; indexStep++) {
            const currentIndex = getCurrentIndex(indexStep);
            const newElement = currentIndex === toIndex ? elementToMove : properties[getNextIndex(currentIndex)];
            properties[currentIndex] = newElement;
        }
    }
}
