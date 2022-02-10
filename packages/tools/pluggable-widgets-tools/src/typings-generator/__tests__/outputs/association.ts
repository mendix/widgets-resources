export const associationWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue, ModifiableValue } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    reference: ModifiableValue<ObjectItem>;
    optionsSource?: ListValue;
    displayValue?: ListAttributeValue<string>;
}

export interface MyWidgetPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    reference: string;
    optionsSource: {} | { type: string } | null;
    displayValue: string;
}
`;

export const associationNativeOutput = `export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    reference: ModifiableValue<ObjectItem>;
    optionsSource?: ListValue;
    displayValue?: ListAttributeValue<string>;
}`;
