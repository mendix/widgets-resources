/**
 * This file was generated from BadgeButton.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type BootstrapStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export interface BadgeButtonContainerProps extends CommonProps {
    label?: DynamicValue<string>;
    bootstrapStyle: BootstrapStyleEnum;
    value?: DynamicValue<string>;
    onClickEvent?: ActionValue;
}

export interface BadgeButtonPreviewProps extends CommonProps {
    label?: string;
    bootstrapStyle: BootstrapStyleEnum;
    value?: string;
    onClickEvent?: ActionPreview;
}

export interface VisibilityMap {
    label: boolean;
    bootstrapStyle: boolean;
    value: boolean;
    onClickEvent: boolean;
}
