/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ActionsType {
    name: string;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    onReceive?: PluginWidget.ActionValue;
    onOpen?: PluginWidget.ActionValue;
}

export interface NotificationsProps extends CommonProps {
    actions: ActionsType[];
    guid?: PluginWidget.EditableValue<string>;
}
