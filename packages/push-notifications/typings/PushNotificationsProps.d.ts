/**
 * Auto-generated from PushNotifications.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface PushNotificationsProps extends CommonProps {
    actions: Array<{
        name: string;
        onReceive?: PluginWidget.ActionValue;
        onOpen?: PluginWidget.ActionValue;
    }>;
}
