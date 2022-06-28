/**
 * This file was generated from Dropdown.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListExpressionValue, ReferenceValue, ReferenceSetValue } from "mendix";

export interface DropdownContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    attrValue?: EditableValue<string>;
    associationValue?: ReferenceValue | ReferenceSetValue;
    associationOptions?: ListValue;
    multiselect: boolean;
    optionLabel?: ListExpressionValue<string>;
}

export interface DropdownPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    attrValue: string;
    associationValue: string;
    associationOptions: {} | { type: string } | null;
    multiselect: boolean;
    optionLabel: string;
}
