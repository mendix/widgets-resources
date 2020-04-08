/**
 * This file was generated from Badge.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export type TypeEnum = "badge" | "label";

export type BrandStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export interface BadgeContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    type: TypeEnum;
    value?: DynamicValue<string>;
    brandStyle: BrandStyleEnum;
    onClick?: ActionValue;
}

export interface BadgePreviewProps {
    class: string;
    style: string;
    type: TypeEnum;
    value: string;
    brandStyle: BrandStyleEnum;
    onClick: {} | null;
}
