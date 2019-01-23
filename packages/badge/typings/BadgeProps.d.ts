/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface BadgeProps extends CommonProps {
    valueAttribute?: PluginWidget.EditableValue<string | BigJs.Big>;
    type: "badge" | "label";
    badgeStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
    onClickAction?: PluginWidget.ActionValue;
}
