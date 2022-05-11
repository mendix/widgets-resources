/**
 * This file was generated from DatagridDateFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type DefaultFilterEnum =
    | "between"
    | "greater"
    | "greaterEqual"
    | "equal"
    | "notEqual"
    | "smaller"
    | "smallerEqual"
    | "empty"
    | "notEmpty";

export interface DatagridDateFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advanced: boolean;
    defaultValue?: DynamicValue<Date>;
    defaultStartDate?: DynamicValue<Date>;
    defaultEndDate?: DynamicValue<Date>;
    defaultFilter: DefaultFilterEnum;
    placeholder?: DynamicValue<string>;
    adjustable: boolean;
    valueAttribute?: EditableValue<Date>;
    startDateAttribute?: EditableValue<Date>;
    endDateAttribute?: EditableValue<Date>;
    onChange?: ActionValue;
    screenReaderButtonCaption?: DynamicValue<string>;
    screenReaderCalendarCaption?: DynamicValue<string>;
    screenReaderInputCaption?: DynamicValue<string>;
}

export interface DatagridDateFilterPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    advanced: boolean;
    defaultValue: string;
    defaultStartDate: string;
    defaultEndDate: string;
    defaultFilter: DefaultFilterEnum;
    placeholder: string;
    adjustable: boolean;
    valueAttribute: string;
    startDateAttribute: string;
    endDateAttribute: string;
    onChange: {} | null;
    screenReaderButtonCaption: string;
    screenReaderCalendarCaption: string;
    screenReaderInputCaption: string;
}
