import { ActionValue, DynamicValue, EditableValue, ValueStatus } from "mendix";

export function dynamicValue<T>(value?: T): DynamicValue<T> {
    return value == null ? { status: ValueStatus.Loading, value: undefined } : { status: ValueStatus.Available, value };
}

export function actionValue(canExecute = true, isExecuting = false): ActionValue {
    return { canExecute, isExecuting, execute: jest.fn() };
}

export class EditableValueBuilder<T extends string | boolean | Date | BigJs.Big> {
    private readonly editableValue: EditableValue<T> = {
        value: undefined,
        displayValue: "",
        status: ValueStatus.Available,
        validation: undefined,
        readOnly: false,
        formatter: {
            format: jest.fn(name => `Formatted ${name}`),
            parse: jest.fn(),
            getFormatPlaceholder: jest.fn()
        },
        setValidator: jest.fn(),
        setValue: jest.fn((value: T) => this.withValue(value)),
        setTextValue: jest.fn(),
        setFormatter: jest.fn()
    };

    withValue(value?: T): EditableValueBuilder<T> {
        this.editableValue.value = value;
        this.editableValue.displayValue = this.editableValue.formatter.format(value);
        return this;
    }

    isReadOnly(): EditableValueBuilder<T> {
        this.editableValue.readOnly = true;
        return this;
    }

    isLoading(): EditableValueBuilder<T> {
        this.editableValue.status = ValueStatus.Loading;
        return this.isReadOnly();
    }

    isUnavailable(): EditableValueBuilder<T> {
        this.editableValue.status = ValueStatus.Unavailable;
        return this.isReadOnly();
    }

    withValidation(validation?: string): EditableValueBuilder<T> {
        this.editableValue.validation = validation;
        return this;
    }

    withUniverse(...values: T[]): EditableValueBuilder<T> {
        this.editableValue.universe = values;
        return this;
    }

    build(): EditableValue<T> {
        return this.editableValue;
    }
}
