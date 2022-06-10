/**
 * This file was generated from ButtonWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, WebIcon } from "mendix";

export type ShapeEnum = "default" | "circle" | "round";

export type SizeEnum = "large" | "middle" | "small";

export type TypeEnum = "primary" | "ghost" | "dashed" | "link" | "text" | "default";

export type ConfirmTypeEnum = "pop" | "modal";

export type ConfirmokTypeEnum = "primary" | "ghost" | "dashed" | "link" | "text" | "default";

export interface ButtonWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    text: string;
    block: boolean;
    danger: DynamicValue<boolean>;
    disabled: DynamicValue<boolean>;
    ghost: boolean;
    icon?: DynamicValue<WebIcon>;
    loading: DynamicValue<boolean>;
    shape: ShapeEnum;
    size: SizeEnum;
    type: TypeEnum;
    href: string;
    openconfirm: boolean;
    confirmType: ConfirmTypeEnum;
    confirmtitle?: DynamicValue<string>;
    confirmokText: string;
    confirmcancelText: string;
    confirmokType: ConfirmokTypeEnum;
    onConfirm?: ActionValue;
    onCancel?: ActionValue;
    onClickAction?: ActionValue;
    authPath: string;
    advanced: boolean;
}

export interface ButtonWebPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    text: string;
    block: boolean;
    danger: string;
    disabled: string;
    ghost: boolean;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    loading: string;
    shape: ShapeEnum;
    size: SizeEnum;
    type: TypeEnum;
    href: string;
    openconfirm: boolean;
    confirmType: ConfirmTypeEnum;
    confirmtitle: string;
    confirmokText: string;
    confirmcancelText: string;
    confirmokType: ConfirmokTypeEnum;
    onConfirm: {} | null;
    onCancel: {} | null;
    onClickAction: {} | null;
    authPath: string;
    advanced: boolean;
}
