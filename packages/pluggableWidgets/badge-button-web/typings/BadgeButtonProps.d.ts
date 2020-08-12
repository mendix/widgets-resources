/**
 * This file was generated from BadgeButton.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export type BootstrapStyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export interface BadgeButtonContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    label?: DynamicValue<string>;
    bootstrapStyle: BootstrapStyleEnum;
    value?: DynamicValue<string>;
    onClickEvent?: ActionValue;
}

export interface BadgeButtonPreviewProps {
    class: string;
    style: string;
    label: string;
    bootstrapStyle: BootstrapStyleEnum;
    value: string;
    onClickEvent: {} | null;
}
