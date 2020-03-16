import { ActionValue, DynamicValue, EditableValue, ValueStatus } from "mendix";

export const executeAction = (action?: ActionValue): void => {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
};

export const isAvailable = (property: DynamicValue<any> | EditableValue<any>): boolean => {
    return property.status === ValueStatus.Available && property.value != null;
};
