export const associationWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue, ReferenceValue, ReferenceSetValue } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    reference: ReferenceValue;
    referenceSet: ReferenceSetValue;
    referenceOrSet: ReferenceValue | ReferenceSetValue;
    optionsSource?: ListValue;
    displayValue?: ListAttributeValue<string>;
}

export interface MyWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    reference: string;
    referenceSet: string;
    referenceOrSet: string;
    optionsSource: {} | { type: string } | null;
    displayValue: string;
}
`;

export const associationNativeOutput = `export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    reference: ReferenceValue;
    referenceSet: ReferenceSetValue;
    referenceOrSet: ReferenceValue | ReferenceSetValue;
    optionsSource?: ListValue;
    displayValue?: ListAttributeValue<string>;
}`;
