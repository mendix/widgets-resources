/**
 * Auto-generated from Badge.xml
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
