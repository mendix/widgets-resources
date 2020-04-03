/* eslint-disable */
/**
 * TODO: Include tests for methods
 */
import { Property, PropertyGroup } from "../typings";

declare type Option<T> = T | undefined;

export function hidePropertyIn(propertyGroups: PropertyGroup[], key: string): void;
export function hidePropertyIn(
    propertyGroups: PropertyGroup[],
    key: string,
    nestedPropIndex: number,
    nestedPropKey: string
): void;
export function hidePropertyIn(
    propertyGroups: PropertyGroup[],
    key: string,
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

export function changePropertyIn(propertyGroups: PropertyGroup[], modify: (prop: Property) => void, key: string): void;
export function changePropertyIn(
    propertyGroups: PropertyGroup[],
    modify: (prop: Property) => void,
    key: string,
    nestedPropIndex: number,
    nestedPropKey: string
): void;
export function changePropertyIn(
    propertyGroups: PropertyGroup[],
    modify: (prop: Property) => void,
    key: string,
    nestedPropIndex?: number,
    nestedPropKey?: string
): void {
    modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}

function modifyProperty(
    modify: (prop: Property, index: number, container: Property[]) => void,
    propertyGroups: PropertyGroup[],
    key: string,
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
