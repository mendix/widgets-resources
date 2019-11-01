/**
 * This file was generated from Badge.xml
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

export type TypeEnum = "badge" | "label";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export interface BadgeContainerProps extends CommonProps {
    type: TypeEnum;
    defaultValue?: DynamicValue<string>;
    valueAttribute?: EditableValue<string | BigJs.Big>;
    bootstrapStyle: BootstrapStyleEnum;
    onClick: ActionValue;
}

export interface BadgePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    type: TypeEnum;
    defaultValue?: string;
    valueAttribute?: string;
    bootstrapStyle: BootstrapStyleEnum;
    onClick: ActionPreview;
}

export interface VisibilityMap {
    type: boolean;
    defaultValue: boolean;
    valueAttribute: boolean;
    bootstrapStyle: boolean;
    onClick: boolean;
}
