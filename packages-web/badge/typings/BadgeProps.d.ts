/**
 * This file was generated from Badge.xml
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

export type TypeEnum = "badge" | "label";

export type BrandStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export interface BadgeContainerProps extends CommonProps {
    type: TypeEnum;
    value?: DynamicValue<string>;
    brandStyle: BrandStyleEnum;
    onClick?: ActionValue;
}

export interface BadgePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    type: TypeEnum;
    value?: string;
    brandStyle: BrandStyleEnum;
    onClick: ActionPreview;
}

export interface VisibilityMap {
    type: boolean;
    value: boolean;
    brandStyle: boolean;
    onClick: boolean;
}
