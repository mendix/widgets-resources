export const containmentWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content: ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    description: string;
    action: {} | null;
}
`;
export const containmentNativeOutput = `export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    content: ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}`;
