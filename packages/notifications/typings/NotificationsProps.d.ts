/**
 * This file was generated from Notifications.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface ActionsType {
    name: string;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    onReceive?: ActionValue;
    onOpen?: ActionValue;
}

export interface NotificationsProps<Style> extends CommonProps<Style> {
    actions: ActionsType[];
    guid?: EditableValue<string>;
}
