/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface BadgeProps extends CommonProps {
    value?: PluginWidget.EditableValue<string | BigJs.Big>;
    defaultValue?: string;
    onClick?: PluginWidget.ActionValue;
    type: "badge" | "label";
    color: "default" | "primary" | "success" | "info" | "warning" | "danger";
}
