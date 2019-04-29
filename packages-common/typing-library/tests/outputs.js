const nativeResult = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, DynamicValue, EditableValue, NativeImage } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps<Style> {
    style: Style[];
}

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type MywidgetTypeEnum = "badge" | "label";

export interface ActionsType {
    name: string;
    enabled: boolean;
    action: ActionValue;
    image: DynamicValue<NativeImage>;
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    valueAttribute?: EditableValue<string | BigJs.Big>;
    mywidgetValue?: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionList?: DynamicValue<BigJs.Big[]>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: number;
    image?: DynamicValue<NativeImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}
`;

const webResult = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { pages } from "mendixmodelsdk";
import { ActionValue, DynamicValue, EditableValue, WebImage } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type MywidgetTypeEnum = "badge" | "label";

export interface ActionsType {
    name: string;
    enabled: boolean;
    action: ActionValue;
    image: DynamicValue<WebImage>;
}

export interface ActionsPreviewType {
    name: string;
    enabled: boolean;
    action: pages.ClientAction;
    image: WebImage;
}

export interface ActionsVisibilityType {
    name: boolean;
    enabled: boolean;
    action: boolean;
    image: boolean;
}

export interface MyWidgetContainerProps extends CommonProps {
    valueAttribute?: EditableValue<string | BigJs.Big>;
    mywidgetValue?: string;
    valueExpression?: DynamicValue<string>;
    valueExpressionList?: DynamicValue<BigJs.Big[]>;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: number;
    image?: DynamicValue<WebImage>;
    onClickAction?: ActionValue;
    onChange?: ActionValue;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps extends CommonProps {
    valueAttribute?: string;
    mywidgetValue?: string;
    valueExpression?: string;
    valueExpressionList?: string;
    bootstrapStyle: BootstrapStyleEnum;
    mywidgetType: MywidgetTypeEnum;
    tries?: number;
    image?: WebImage;
    onClickAction?: pages.ClientAction;
    onChange?: pages.ClientAction;
    actions: ActionsPreviewType[];
}

export interface VisibilityMap {
    valueAttribute: boolean;
    mywidgetValue: boolean;
    valueExpression: boolean;
    valueExpressionList: boolean;
    bootstrapStyle: boolean;
    mywidgetType: boolean;
    tries: boolean;
    image: boolean;
    onClickAction: boolean;
    onChange: boolean;
    actions: ActionsVisibilityType[] | boolean;
}
`;

module.exports = {nativeResult, webResult};
