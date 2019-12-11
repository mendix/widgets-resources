import { ActionValue, DynamicValue, ValueStatus } from "mendix";

export const executeAction = (action?: ActionValue): void => {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
};

export declare interface Value<T> {
    readonly status: ValueStatus;
    readonly value: T | undefined;
}

export enum BootstrapStyle {
    default = "default",
    info = "info",
    primary = "primary",
    success = "success",
    warning = "warning",
    danger = "danger",
    inverse = "inverse"
}

export type BootstrapStyleKey = keyof typeof BootstrapStyle;

export function getValue<T>(attribute?: Value<T>): T | undefined {
    return attribute && attribute.status === ValueStatus.Available && attribute.value ? attribute.value : undefined;
}

export const getNumberValue = (attribute?: DynamicValue<BigJs.Big>): number | undefined => {
    return attribute && attribute.status === ValueStatus.Available && attribute.value
        ? Number(attribute.value)
        : undefined;
};
