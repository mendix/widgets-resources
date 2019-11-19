export const containmentWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface MyWidgetContainerProps extends CommonProps {
    content: ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    content: ReactNode;
    description: string;
    action: ActionPreview;
}

export interface VisibilityMap {
    content: boolean;
    description: boolean;
    action: boolean;
}
`;
export const containmentNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Partial<Style>[];
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    content: ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}
`;
