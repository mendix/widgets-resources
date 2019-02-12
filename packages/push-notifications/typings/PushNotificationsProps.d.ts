/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * File generated based on PushNotifications.xml
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ActionsType {
    name: string;
    onReceive?: PluginWidget.ActionValue;
    onOpen?: PluginWidget.ActionValue;
}

export interface PushNotificationsProps extends CommonProps {
    actions: ActionsType[];
}
