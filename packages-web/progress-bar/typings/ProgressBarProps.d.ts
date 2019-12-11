/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type ShowContentEnum = "none" | "value" | "percentage" | "text";

export type BarTypeEnum = "default" | "striped" | "animated";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "warning" | "danger" | "inverse";

export interface ProgressBarContainerProps extends CommonProps {
    value: DynamicValue<BigJs.Big>;
    minimumValue: DynamicValue<BigJs.Big>;
    maximumValue: DynamicValue<BigJs.Big>;
    onClick?: ActionValue;
    showContent: ShowContentEnum;
    text?: DynamicValue<string>;
    barType: BarTypeEnum;
    bootstrapStyle: BootstrapStyleEnum;
    bootstrapStyleAttribute?: EditableValue<string>;
}

export interface ProgressBarPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    value: BigJs.Big;
    minimumValue: BigJs.Big;
    maximumValue: BigJs.Big;
    onClick?: ActionPreview;
    showContent: ShowContentEnum;
    text?: string;
    barType: BarTypeEnum;
    bootstrapStyle: BootstrapStyleEnum;
    bootstrapStyleAttribute?: string;
}

export interface VisibilityMap {
    value: boolean;
    minimumValue: boolean;
    maximumValue: boolean;
    onClick: boolean;
    showContent: boolean;
    text: boolean;
    barType: boolean;
    bootstrapStyle: boolean;
    bootstrapStyleAttribute: boolean;
}
