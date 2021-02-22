/**
 * This file was generated from DatagridTextFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export type DefaultFilterEnum = "contains" | "startsWith" | "endsWith" | "greater" | "greaterEqual" | "equal" | "notEqual" | "smaller" | "smallerEqual";

export interface DatagridTextFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    defaultValue?: DynamicValue<string>;
    defaultFilter: DefaultFilterEnum;
    placeholder?: DynamicValue<string>;
    adjustable: boolean;
    delay: number;
    screenReaderButtonCaption?: DynamicValue<string>;
    screenReaderInputCaption?: DynamicValue<string>;
}

export interface DatagridTextFilterPreviewProps {
    class: string;
    style: string;
    defaultValue: string;
    defaultFilter: DefaultFilterEnum;
    placeholder: string;
    adjustable: boolean;
    delay: number | null;
    screenReaderButtonCaption: string;
    screenReaderInputCaption: string;
}
