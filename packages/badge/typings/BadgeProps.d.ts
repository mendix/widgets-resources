/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export type TypeEnum = "badge" | "label";

export type ColorEnum = "default" | "primary" | "success" | "info" | "warning" | "danger";

export interface BadgeProps extends CommonProps {
    value?: PluginWidget.EditableValue<string | BigJs.Big>;
    defaultValue?: string;
    onClick?: PluginWidget.ActionValue;
    type: TypeEnum;
    color: ColorEnum;
}
