export const nativeResult = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { ActionValue, DynamicValue, EditableValue, FileValue, NativeImage } from "mendix";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type MywidgetTypeEnum = "badge" | "label";

export interface ActionsType {
    name: string;
    enabled: boolean;
    action?: ActionValue;
    image: DynamicValue<NativeImage>;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    valueAttribute?: EditableValue<string | BigJs.Big>;
    mywidgetValue?: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionDecimal?: DynamicValue<BigJs.Big>;
    file: DynamicValue<FileValue>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: BigJs.Big;
    amount?: BigJs.Big;
    image?: DynamicValue<NativeImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}
`;

export const webResult = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, FileValue, WebImage } from "mendix";

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
    image: ImagePreview;
}

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    valueAttribute?: EditableValue<string | BigJs.Big>;
    mywidgetValue?: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionDecimal?: DynamicValue<BigJs.Big>;
    file: DynamicValue<FileValue>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: BigJs.Big;
    amount?: BigJs.Big;
    image?: DynamicValue<WebImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    valueAttribute: string;
    mywidgetValue: string;
    valueExpression: string;
    valueExpressionDecimal: string;
    file: string;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries: number | null;
    amount: number | null;
    image: ImagePreview;
    onClickAction: {} | null;
    onChange: {} | null;
    actions: ActionsPreviewType[];
}

export interface VisibilityMap {
    valueAttribute: boolean;
    mywidgetValue: boolean;
    valueExpression: boolean;
    valueExpressionDecimal: boolean;
    file: boolean;
    bootstrapStyle: boolean;
    mywidgetType: boolean;
    tries: boolean;
    amount: boolean;
    image: boolean;
    onClickAction: boolean;
    onChange: boolean;
    actions: boolean | Array<{
        name: boolean;
        enabled: boolean;
        action: boolean;
        image: boolean;
    }>;
}
`;
