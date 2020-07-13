export const fileWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, FileValue } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    file: DynamicValue<FileValue>;
    file2?: DynamicValue<FileValue>;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    file: { displayValue: string } | null;
    file2: { displayValue: string } | null;
    description: { displayValue: string } | null;
    action: {} | null;
}
`;
export const fileNativeOutput = `export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    file: DynamicValue<FileValue>;
    file2?: DynamicValue<FileValue>;
    description: EditableValue<string>;
    action?: ActionValue;
}`;
