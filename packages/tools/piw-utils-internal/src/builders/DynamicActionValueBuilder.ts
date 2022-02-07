import { ActionValue, DynamicValue, ValueStatus } from "mendix";

export function dynamicValue<T>(value?: T, loading?: boolean): DynamicValue<T> {
    if (loading) {
        return { status: ValueStatus.Loading, value };
    }
    return value !== undefined
        ? { status: ValueStatus.Available, value }
        : { status: ValueStatus.Unavailable, value: undefined };
}

export function actionValue(canExecute = true, isExecuting = false): ActionValue {
    return { canExecute, isExecuting, execute: jest.fn() };
}
