export const fileWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue, FileValue } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    id: string;
    tabIndex?: number;
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
export const fileNativeOutput = `export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    file: DynamicValue<FileValue>;
    file2?: DynamicValue<FileValue>;
    description: EditableValue<string>;
    action?: ActionValue;
}`;
