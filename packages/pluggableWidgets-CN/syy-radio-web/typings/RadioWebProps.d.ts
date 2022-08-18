/**
 * This file was generated from RadioWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type DatasTypeEnum = "dynamic" | "static";

export interface StaticDataType {
    manualValue: string;
    manuaTitle: string;
    manualDisabled: boolean;
}

export type SizeEnum = "large" | "middle" | "small";

export type ButtonStyleEnum = "outline" | "solid";

export type OptionTypeEnum = "default" | "button";

export type DirectionEnum = "horizontal" | "vertical";

export interface StaticDataPreviewType {
    manualValue: string;
    manuaTitle: string;
    manualDisabled: boolean;
}

export interface RadioWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasType: DatasTypeEnum;
    staticData: StaticDataType[];
    data?: ListValue;
    attribute?: ListAttributeValue<string | Date | Big>;
    title?: ListAttributeValue<string>;
    attributedata?: EditableValue<string>;
    selectedValue?: EditableValue<string | Date | Big>;
    isText: boolean;
    size: SizeEnum;
    buttonStyle: ButtonStyleEnum;
    disabled: DynamicValue<boolean>;
    radioName: string;
    optionType: OptionTypeEnum;
    direction: DirectionEnum;
    onChangeAction?: ActionValue;
    customWidgetOnChangeValidate: boolean;
}

export interface RadioWebPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    datasType: DatasTypeEnum;
    staticData: StaticDataPreviewType[];
    data: {} | { type: string } | null;
    attribute: string;
    title: string;
    attributedata: string;
    selectedValue: string;
    isText: boolean;
    size: SizeEnum;
    buttonStyle: ButtonStyleEnum;
    disabled: string;
    radioName: string;
    optionType: OptionTypeEnum;
    direction: DirectionEnum;
    onChangeAction: {} | null;
    customWidgetOnChangeValidate: boolean;
}
