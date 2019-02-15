import { ReactNode } from "react";
// import { Dispatch } from "./dispatch";
// import { FormatterConfig } from "./formatters/FormatterConfig";
// import { ValueFormatter } from "./formatters/ValueFormatter";
// import { ResolvedValue } from "./values/ResolvedValue";

type FormatterConfig<T> = any;
type Dispatch = any;
type ValueFormatter<T> = any;
type ResolvedValue<T> = any;
type Option<T> = T | undefined;
type AttributeValue = any;

declare global {
    namespace PluginWidget {
        export type PrimitiveValue = number | string | boolean | null;
        export type WidgetPropertyValue =
            | PrimitiveValue
            | PrimitiveValue[]
            | ResolvedValue<any>
            | (() => ReactNode)
            | ReactNode
            | { [name: string]: WidgetPropertyValue };

        export interface PluginWidgetProps {
            $dispatch: Dispatch;
            [name: string]: WidgetPropertyValue | Dispatch;
        }

        export const enum ValueStatus {
            Loading = "loading",
            Unavailable = "unavailable",
            Available = "available"
        }

        export type DynamicValue<T> =
            | { status: ValueStatus.Loading | ValueStatus.Unavailable; value: undefined }
            | { status: ValueStatus.Available; value: T };

        export interface ActionValue {
            canExecute: boolean;
            isExecuting: boolean;
            execute(): void;
        }

        export interface EditableValue<T extends AttributeValue> {
            value: Option<T>;
            displayValue: string;
            status: ValueStatus;
            validation: string[];
            readOnly: boolean;
            formatter: ValueFormatter<T>;
            universe?: T[];
            setValue(value: Option<T>): void;
            setTextValue(value: string): void;
            setFormatting(config: FormatterConfig<T>): void;
            setValidation(validation?: string): void;
        }
    }
}
