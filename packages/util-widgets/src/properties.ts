import { DynamicValue, EditableValue, ValueStatus } from "@mendix/pluggable-widgets-api/properties";

export function available(property: EditableValue<any> | DynamicValue<any>): boolean {
    return property.status === ValueStatus.Available && property.value != null;
}

export function unavailable(property: EditableValue<any> | DynamicValue<any>): boolean {
    return (
        property.status === ValueStatus.Unavailable ||
        (property.status === ValueStatus.Available && property.value == null)
    );
}
