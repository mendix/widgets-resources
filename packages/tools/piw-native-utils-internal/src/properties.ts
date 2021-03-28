import { DynamicValue, EditableValue, ValueStatus } from "mendix";
import { Big } from "big.js";

export function available(property: EditableValue<any> | DynamicValue<any>): boolean {
    return property.status === ValueStatus.Available && property.value != null;
}

export function unavailable(property: EditableValue<any> | DynamicValue<any>): boolean {
    return (
        property.status === ValueStatus.Unavailable ||
        (property.status === ValueStatus.Available && property.value == null)
    );
}

export function toNumber(property: EditableValue<Big> | DynamicValue<Big>): number | undefined {
    return available(property) ? Number(property.value) : undefined;
}
