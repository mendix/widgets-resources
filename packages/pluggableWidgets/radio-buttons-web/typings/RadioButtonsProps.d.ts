/**
 * This file was generated from RadioButtons.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";

export type DataSourceTypeEnum = "attribute" | "association";

export type OrientationEnum = "horizontal" | "vertical";

export interface OptionsType {
    caption: DynamicValue<string>;
    value: DynamicValue<string>;
    optionContent?: ReactNode;
}

export interface OptionsPreviewType {
    caption: string;
    value: string;
    optionContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

export interface RadioButtonsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSourceType: DataSourceTypeEnum;
    ds: ListValue;
    content?: ListWidgetValue;
    dsAttribute?: EditableValue<string | boolean>;
    dsAssociation?: any;
    labelAttrib?: ListAttributeValue<string>;
    orientation: OrientationEnum;
    enableAutoOptions: boolean;
    options: OptionsType[];
    isEditable: boolean;
    onChange?: ActionValue;
}

export interface RadioButtonsPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    dataSourceType: DataSourceTypeEnum;
    ds: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    dsAttribute: string;
    dsAssociation: any;
    labelAttrib: string;
    orientation: OrientationEnum;
    enableAutoOptions: boolean;
    options: OptionsPreviewType[];
    isEditable: boolean;
    onChange: {} | null;
}
