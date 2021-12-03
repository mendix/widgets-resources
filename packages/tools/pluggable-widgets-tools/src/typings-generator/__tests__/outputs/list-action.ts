export const listActionWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface ActionsType {
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface ActionsPreviewType {
    description: string;
    action: {} | null;
}

export interface MyWidgetContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    readOnly: boolean;
    actions: ActionsPreviewType[];
}
`;
export const listActionNativeOutput = `export interface ActionsType {
    description: EditableValue<string>;
    action?: ActionValue;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    actions: ActionsType[];
}`;
