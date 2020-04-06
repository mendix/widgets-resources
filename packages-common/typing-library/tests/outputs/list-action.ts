export const listActionWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { CSSProperties } from "react";
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
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    actions: ActionsPreviewType[];
}

export interface VisibilityMap {
    actions: boolean | Array<{
        description: boolean;
        action: boolean;
    }>;
}
`;
export const listActionNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
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

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    actions: ActionsPreviewType[];
}
`;
