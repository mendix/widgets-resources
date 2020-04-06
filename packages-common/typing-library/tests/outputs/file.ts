export const fileWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
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
    file: string;
    file2: string;
    description: string;
    action: {} | null;
}

export interface VisibilityMap {
    file: boolean;
    file2: boolean;
    description: boolean;
    action: boolean;
}
`;
export const fileNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { ActionValue, DynamicValue, EditableValue, FileValue } from "mendix";

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    file: DynamicValue<FileValue>;
    file2?: DynamicValue<FileValue>;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    file: string;
    file2: string;
    description: string;
    action: {} | null;
}
`;
