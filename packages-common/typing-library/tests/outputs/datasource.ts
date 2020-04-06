export const datasourceWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { Component, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ObjectItem } from "mendix";

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    contentSource: ListValue;
    content: (item: ObjectItem) => ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    contentSource: {} | null;
    content: { widgetCount: number; renderer: Component };
    description: string;
    action: {} | null;
}

export interface VisibilityMap {
    contentSource: boolean;
    content: boolean;
    description: boolean;
    action: boolean;
}
`;
export const datasourceNativeOutput = `export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    contentSource: ListValue;
    content: (item: ObjectItem) => ReactNode;
    description: EditableValue<string>;
    action?: ActionValue;
}`;
