export const fileWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue, FileValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface MyWidgetContainerProps extends CommonProps {
    file: DynamicValue<FileValue>;
    file2?: DynamicValue<FileValue>;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    file: FileValue;
    file2?: FileValue;
    description: string;
    action: ActionPreview;
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
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, EditableValue, FileValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    file: DynamicValue<FileValue>;
    file2?: DynamicValue<FileValue>;
    description: EditableValue<string>;
    action?: ActionValue;
}
`;
