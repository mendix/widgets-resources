/**
 * This file was generated from DatagridDropdownFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

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
    defaultValue?: DynamicValue<string>;
    filterOptions: FilterOptionsType[];
    emptyOptionCaption?: DynamicValue<string>;
    multiSelect: boolean;
    ariaLabel?: DynamicValue<string>;
}

export interface DatagridDropdownFilterPreviewProps {
    class: string;
    style: string;
    defaultValue: string;
    filterOptions: FilterOptionsPreviewType[];
    emptyOptionCaption: string;
    multiSelect: boolean;
    ariaLabel: string;
}
