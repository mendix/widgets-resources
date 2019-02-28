/**
 * This file was generated from Badge.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export type TypeEnum = "badge" | "label";

export type ColorEnum = "default" | "primary" | "success" | "info" | "warning" | "danger";

export interface BadgeProps<Style> extends CommonProps<Style> {
    value?: EditableValue<string | BigJs.Big>;
    defaultValue?: string;
    onClick?: ActionValue;
    type: TypeEnum;
    color: ColorEnum;
}
