import { DynamicValue, EditableValue, ValueStatus } from "mendix";

export function available(property: EditableValue<any> | DynamicValue<any>): boolean {
    return property.status === ValueStatus.Available && property.value != null;
}

export function unavailable(property: EditableValue<any> | DynamicValue<any>): boolean {
    return (
        property.status === ValueStatus.Unavailable ||
        (property.status === ValueStatus.Available && property.value == null)
    );
}

export function toNumber(property: EditableValue<BigJs.Big> | DynamicValue<BigJs.Big>): number | undefined {
    return available(property) ? Number(property.value) : undefined;
}
