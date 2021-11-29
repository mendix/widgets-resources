export const datasourceWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export interface DatasourcePropertiesType {
    contentAttribute: ListWidgetValue;
    markerAttribute: ListAttributeValue<string | boolean | Big>;
    actionAttribute?: ListActionValue;
    optionalDSAttribute?: ListAttributeValue<string | boolean | Big>;
    optionalDSAction?: ListActionValue;
    optionalDSTextTemplate?: ListExpressionValue<string>;
    optionalDSExpression?: ListExpressionValue<Big>;
    optionalContent?: ListWidgetValue;
}

export interface DatasourcePropertiesPreviewType {
    contentAttribute: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    markerAttribute: string;
    actionAttribute: {} | null;
    optionalDSAttribute: string;
    optionalDSAction: {} | null;
    optionalDSTextTemplate: string;
    optionalDSExpression: string;
    optionalContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    contentSource: ListValue;
    optionalSource?: ListValue;
    content: ListWidgetValue;
    markerDataAttribute: ListAttributeValue<string | boolean | Big>;
    actionAttribute?: ListActionValue;
    textTemplateAttribute: ListExpressionValue<string>;
    expressionAttribute: ListExpressionValue<Big>;
    optionalDSAttribute?: ListAttributeValue<string | boolean | Big>;
    optionalDSAction?: ListActionValue;
    optionalDSTextTemplate?: ListExpressionValue<string>;
    optionalDSExpression?: ListExpressionValue<Big>;
    optionalContent?: ListWidgetValue;
    datasourceProperties: DatasourcePropertiesType[];
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetPreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    contentSource: {} | { type: string } | null;
    optionalSource: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    markerDataAttribute: string;
    actionAttribute: {} | null;
    textTemplateAttribute: string;
    expressionAttribute: string;
    optionalDSAttribute: string;
    optionalDSAction: {} | null;
    optionalDSTextTemplate: string;
    optionalDSExpression: string;
    optionalContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    datasourceProperties: DatasourcePropertiesPreviewType[];
    description: string;
    action: {} | null;
}
`;

export const datasourceNativeOutput = `export interface DatasourcePropertiesType {
    contentAttribute: ListWidgetValue;
    markerAttribute: ListAttributeValue<string | boolean | Big>;
    actionAttribute?: ListActionValue;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    contentSource: ListValue;
    content: ListWidgetValue;
    markerDataAttribute: ListAttributeValue<string | boolean | Big>;
    actionAttribute?: ListActionValue;
    textTemplateAttribute: ListExpressionValue<string>;
    expressionAttribute: ListExpressionValue<Big>;
    datasourceProperties: DatasourcePropertiesType[];
    description: EditableValue<string>;
    action?: ActionValue;
}`;
