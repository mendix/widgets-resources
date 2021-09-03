/**
 * This file was generated from DatagridDateFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export type DefaultFilterEnum = "greater" | "greaterEqual" | "equal" | "notEqual" | "smaller" | "smallerEqual";

export interface DatagridDateFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    defaultValue?: DynamicValue<Date>;
    defaultFilter: DefaultFilterEnum;
    placeholder?: DynamicValue<string>;
    adjustable: boolean;
    screenReaderButtonCaption?: DynamicValue<string>;
    screenReaderInputCaption?: DynamicValue<string>;
}

export interface DatagridDateFilterPreviewProps {
    class: string;
    style: string;
    defaultValue: string;
    defaultFilter: DefaultFilterEnum;
    placeholder: string;
    adjustable: boolean;
    screenReaderButtonCaption: string;
    screenReaderInputCaption: string;
}
