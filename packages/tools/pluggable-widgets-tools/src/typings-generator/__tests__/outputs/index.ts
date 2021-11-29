export const nativeResult = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, FileValue, NativeImage } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type MywidgetTypeEnum = "badge" | "label";

export interface ActionsType {
    name: string;
    enabled: boolean;
    action?: ActionValue;
    image: DynamicValue<NativeImage>;
}

export interface ActionsPreviewType {
    name: string;
    enabled: boolean;
    action: {} | null;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    valueAttribute?: EditableValue<string | Big>;
    mywidgetValue: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionDecimal?: DynamicValue<Big>;
    file: DynamicValue<FileValue>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: number;
    amount?: Big;
    image?: DynamicValue<NativeImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    valueAttribute: string;
    mywidgetValue: string;
    valueExpression: string;
    valueExpressionDecimal: string;
    file: string;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries: number | null;
    amount: number | null;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
    onClickAction: {} | null;
    onChange: {} | null;
    actions: ActionsPreviewType[];
}
`;

export const webResult = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, FileValue, WebImage } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type MywidgetTypeEnum = "badge" | "label";

export interface ActionsType {
    name: string;
    enabled: boolean;
    action?: ActionValue;
    image: DynamicValue<WebImage>;
}

export interface ActionsPreviewType {
    name: string;
    enabled: boolean;
    action: {} | null;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
}

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute?: EditableValue<string | Big>;
    mywidgetValue: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionDecimal?: DynamicValue<Big>;
    file: DynamicValue<FileValue>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: number;
    amount?: Big;
    image?: DynamicValue<WebImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    valueAttribute: string;
    mywidgetValue: string;
    valueExpression: string;
    valueExpressionDecimal: string;
    file: string;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries: number | null;
    amount: number | null;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
    onClickAction: {} | null;
    onChange: {} | null;
    actions: ActionsPreviewType[];
}
`;

export const webResultGroup = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue, FileValue, WebImage } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type MywidgetTypeEnum = "badge" | "label";

export interface ActionsType {
    name: string;
    enabled: boolean;
    action?: ActionValue;
    image: DynamicValue<WebImage>;
}

export interface ActionsPreviewType {
    name: string;
    enabled: boolean;
    action: {} | null;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
}

export interface MyWidgetContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    valueAttribute?: EditableValue<string | Big>;
    mywidgetValue: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionDecimal?: DynamicValue<Big>;
    file: DynamicValue<FileValue>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: number;
    amount?: Big;
    image?: DynamicValue<WebImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    readOnly: boolean;
    valueAttribute: string;
    mywidgetValue: string;
    valueExpression: string;
    valueExpressionDecimal: string;
    file: string;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries: number | null;
    amount: number | null;
    image: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
    onClickAction: {} | null;
    onChange: {} | null;
    actions: ActionsPreviewType[];
}
`;
