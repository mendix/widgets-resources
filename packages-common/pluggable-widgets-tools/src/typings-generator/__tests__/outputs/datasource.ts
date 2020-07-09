export const datasourceWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ObjectItem } from "mendix";

export interface DatasourcePropertiesType {
    contentAttribute: (item: ObjectItem) => ReactNode;
    markerAttribute: (item: ObjectItem) => EditableValue<string | boolean | BigJs.Big>;
    actionAttribute?: (item: ObjectItem) => ActionValue;
}

export interface DatasourcePropertiesPreviewType {
    contentAttribute: { widgetCount: number; renderer: ComponentType };
    markerAttribute: string;
    actionAttribute: {} | null;
}

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    contentSource: ListValue;
    content: (item: ObjectItem) => ReactNode;
    markerDataAttribute: (item: ObjectItem) => EditableValue<string | boolean | BigJs.Big>;
    actionAttribute?: (item: ObjectItem) => ActionValue;
    datasourceProperties: DatasourcePropertiesType[];
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    contentSource: {} | null;
    content: { widgetCount: number; renderer: ComponentType };
    markerDataAttribute: string;
    actionAttribute: {} | null;
    datasourceProperties: DatasourcePropertiesPreviewType[];
    description: string;
    action: {} | null;
}
`;

export const datasourceNativeOutput = `export interface DatasourcePropertiesType {
    contentAttribute: (item: ObjectItem) => ReactNode;
    markerAttribute: (item: ObjectItem) => EditableValue<string | boolean | BigJs.Big>;
    actionAttribute?: (item: ObjectItem) => ActionValue;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    contentSource: ListValue;
    content: (item: ObjectItem) => ReactNode;
    markerDataAttribute: (item: ObjectItem) => EditableValue<string | boolean | BigJs.Big>;
    actionAttribute?: (item: ObjectItem) => ActionValue;
    datasourceProperties: DatasourcePropertiesType[];
    description: EditableValue<string>;
    action?: ActionValue;
}`;
