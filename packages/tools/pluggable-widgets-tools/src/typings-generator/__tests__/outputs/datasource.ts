export const datasourceWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";

export interface DatasourcePropertiesType {
    contentAttribute: ListWidgetValue;
    markerAttribute: ListAttributeValue<string | boolean | BigJs.Big>;
    actionAttribute?: ListActionValue;
}

export interface DatasourcePropertiesPreviewType {
    contentAttribute: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    markerAttribute: string;
    actionAttribute: {} | null;
}

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    contentSource: ListValue;
    content: ListWidgetValue;
    markerDataAttribute: ListAttributeValue<string | boolean | BigJs.Big>;
    actionAttribute?: ListActionValue;
    textTemplateAttribute: ListExpressionValue<string>;
    expressionAttribute: ListExpressionValue<BigJs.Big>;
    datasourceProperties: DatasourcePropertiesType[];
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    contentSource: {} | null;
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    markerDataAttribute: string;
    actionAttribute: {} | null;
    textTemplateAttribute: string;
    expressionAttribute: string;
    datasourceProperties: DatasourcePropertiesPreviewType[];
    description: string;
    action: {} | null;
}
`;

export const datasourceNativeOutput = `export interface DatasourcePropertiesType {
    contentAttribute: ListWidgetValue;
    markerAttribute: ListAttributeValue<string | boolean | BigJs.Big>;
    actionAttribute?: ListActionValue;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    contentSource: ListValue;
    content: ListWidgetValue;
    markerDataAttribute: ListAttributeValue<string | boolean | BigJs.Big>;
    actionAttribute?: ListActionValue;
    textTemplateAttribute: ListExpressionValue<string>;
    expressionAttribute: ListExpressionValue<BigJs.Big>;
    datasourceProperties: DatasourcePropertiesType[];
    description: EditableValue<string>;
    action?: ActionValue;
}`;
