import { ValueStatus } from "mendix";

type Option<T> = T | undefined;

interface EditableValueFormatter {
    type: string;
    format: any;
    parse: any;
    getFormatPlaceholder: any;
    withConfig: () => void;
}

interface EditableValue<T> {
    status: ValueStatus;
    readOnly: boolean;
    value: Option<T>;
    displayValue: string;
    validation: Option<string>;
    formatter: EditableValueFormatter;
    setValidator: () => void;
    setValue: (value: T) => void;
    setTextValue: (value: string) => void;
    setFormatter: (formatter: any) => void;
    universe?: T[];
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
            withConfig: jest.fn(() => new EditableValueBuilder().build().formatter),
            getFormatPlaceholder: jest.fn(),
            type: "datetime"
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

    withFormatter(formatter: EditableValueFormatter): EditableValueBuilder<T> {
        this.editableValue.formatter = formatter;
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
