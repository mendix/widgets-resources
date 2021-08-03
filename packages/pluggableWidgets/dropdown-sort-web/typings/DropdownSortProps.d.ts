/**
 * This file was generated from DropdownSort.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export type SortOrderEnum = "asc" | "desc";

export interface DropdownSortContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    emptyOptionCaption?: DynamicValue<string>;
    sortOrder: SortOrderEnum;
    ariaLabel?: DynamicValue<string>;
}

export interface DropdownSortPreviewProps {
    class: string;
    style: string;
    emptyOptionCaption: string;
    sortOrder: SortOrderEnum;
    ariaLabel: string;
}
