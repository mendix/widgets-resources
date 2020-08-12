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
    title?: EditableValue<string>;
    subtitle?: EditableValue<string>;
    body?: EditableValue<string>;
    action?: EditableValue<string>;
}

export interface NotificationsPreviewProps {
    class: string;
    style: string;
    actions: ActionsPreviewType[];
    guid: string;
    title: string;
    subtitle: string;
    body: string;
    action: string;
}
