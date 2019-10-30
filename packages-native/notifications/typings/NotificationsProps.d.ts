/**
 * This file was generated from Notifications.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface ActionsType {
    name: string;
    onReceive?: ActionValue;
    onOpen?: ActionValue;
}

export interface NotificationsProps<Style> extends CommonProps<Style> {
    actions: ActionsType[];
    guid?: EditableValue<string>;
}
