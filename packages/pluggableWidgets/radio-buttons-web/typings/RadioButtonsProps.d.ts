/**
 * This file was generated from RadioButtons.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export type OrientationEnum = "horizontal" | "vertical";

export interface OptionsType {
    caption?: DynamicValue<string>;
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
    ds: ListValue;
    dsAttribute?: EditableValue<string | boolean>;
    orientation: OrientationEnum;
    labelAttrib?: ListAttributeValue<string>;
    enableAutoOptions: boolean;
    options: OptionsType[];
    onChange?: ActionValue;
}

export interface RadioButtonsPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    ds: {} | { type: string } | null;
    dsAttribute: string;
    orientation: OrientationEnum;
    labelAttrib: string;
    enableAutoOptions: boolean;
    options: OptionsPreviewType[];
    onChange: {} | null;
}
