/**
 * This file was generated from Notifications.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface ActionsType {
    name: string;
    onReceive?: ActionValue;
    onOpen?: ActionValue;
}

export interface ActionsPreviewType {
    name: string;
    onReceive: {} | null;
    onOpen: {} | null;
}

export interface NotificationsProps<Style> {
    name: string;
    style: Style[];
    actions: ActionsType[];
    guid?: EditableValue<string>;
}

export interface NotificationsPreviewProps {
    class: string;
    style: string;
    actions: ActionsPreviewType[];
    guid: string;
}
