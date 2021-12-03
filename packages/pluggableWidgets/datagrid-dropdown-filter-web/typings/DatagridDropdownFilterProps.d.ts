/**
 * This file was generated from DatagridDropdownFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface FilterOptionsType {
    caption: DynamicValue<string>;
    value: DynamicValue<string>;
}

export interface FilterOptionsPreviewType {
    caption: string;
    value: string;
}

export interface DatagridDropdownFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advanced: boolean;
    defaultValue?: DynamicValue<string>;
    auto: boolean;
    filterOptions: FilterOptionsType[];
    emptyOptionCaption?: DynamicValue<string>;
    multiSelect: boolean;
    valueAttribute?: EditableValue<string>;
    onChange?: ActionValue;
    ariaLabel?: DynamicValue<string>;
}

export interface DatagridDropdownFilterPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    advanced: boolean;
    defaultValue: string;
    auto: boolean;
    filterOptions: FilterOptionsPreviewType[];
    emptyOptionCaption: string;
    multiSelect: boolean;
    valueAttribute: string;
    onChange: {} | null;
    ariaLabel: string;
}
