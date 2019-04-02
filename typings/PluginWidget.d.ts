import { ReactNode } from "react";

type Option<T> = T | undefined;
type BigJS = BigJs.Big;
type GUID = string & {
    __guidTag: any;
};
type AttributeType =
    | "AutoNumber"
    | "Binary"
    | "Boolean"
    | "Currency"
    | "DateTime"
    | "Decimal"
    | "Enum"
    | "EnumSet"
    | "Float"
    | "HashString"
    | "Integer"
    | "Long"
    | "ObjectReference"
    | "ObjectReferenceSet"
    | "String";
type PrimitiveAttributeValue = undefined | string | boolean | Date | BigJS;
type AttributeValue = PrimitiveAttributeValue | GUID | GUID[];

declare global {
    export type PrimitiveValue = number | string | boolean | null;
    export type PluginWidgetProp =
        | PrimitiveValue
        | PrimitiveValue[]
        | (() => ReactNode)
        | ((props: any) => ReactNode)
        | ReactNode
        | ActionValue
        | DynamicValue<any>
        | EditableValue<any>
        | {
              [name: string]: PluginWidgetProp;
          };

    export interface PluginWidgetProps {
        [name: string]: PluginWidgetProp;
    }

    export interface WebImageSource {
        uri: string;
    }

    export const enum ValueStatus {
        Loading = "loading",
        Unavailable = "unavailable",
        Available = "available"
    }

    export type DynamicValue<T> =
        | {
              status: ValueStatus.Loading | ValueStatus.Unavailable;
              value: undefined;
          }
        | {
              status: ValueStatus.Available;
              value: T;
          };

    export interface ActionValue {
        canExecute: boolean;
        isExecuting: boolean;

        execute(): void;
    }

    export interface EditableValue<T extends AttributeValue> {
        value: Option<T>;
        displayValue: string;
        status: ValueStatus;
        validation: Option<string>;
        readOnly: boolean;
        formatter: ValueFormatter<T>;
        universe?: T[];

        setValidator(validator?: (value: Option<T>) => Option<string>): void;

        setValue(value: Option<T>): void;

        setTextValue(value: string): void;

        setFormatting(config: FormatterConfig<T>): void;
    }

    export type FormatterConfig<V> = V extends BigJS
        ? NumberFormatterConfig
        : V extends Date
        ? DateTimeFormatterConfig
        : never;

    export interface NumberFormatterConfig {
        readonly groupDigits: boolean;
        readonly decimalPrecision?: number;
    }

    export interface DefaultDateTimeFormatterConfig {
        readonly type: "date" | "time" | "datetime";
    }

    export interface CustomDateTimeFormatterConfig {
        readonly type: "custom";
        readonly pattern: string;
    }

    export type DateTimeFormatterConfig = DefaultDateTimeFormatterConfig | CustomDateTimeFormatterConfig;

    interface ValidParseResult<V> {
        readonly valid: true;
        readonly value?: V;
    }

    interface InvalidParseResult {
        readonly valid: false;
    }

    export type ParseResult<V> = ValidParseResult<V> | InvalidParseResult;

    export interface ValueFormatter<V> {
        readonly defaultConfig?: FormatterConfig<V>;

        format(value?: V, config?: FormatterConfig<V>): string;

        parse(value: string, config?: FormatterConfig<V>): ParseResult<V>;

        getFormatPlaceholder(): Option<string>;
    }
}
