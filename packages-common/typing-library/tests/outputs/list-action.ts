export const listActionWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { pages } from "mendixmodelsdk";
import { ActionValue, EditableValue } from "mendix";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface ActionsType {
    description: EditableValue<string>;
    action: ActionValue;
}

export interface ActionsPreviewType {
    description: string;
    action: pages.ClientAction;
}

export interface ActionsVisibilityType {
    description: boolean;
    action: boolean;
}

export interface MyWidgetContainerProps extends CommonProps {
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps extends CommonProps {
    actions: ActionsPreviewType[];
}

export interface VisibilityMap {
    actions: ActionsVisibilityType[] | boolean;
}
`;
export const listActionNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export interface ActionsType {
    description: EditableValue<string>;
    action: ActionValue;
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    actions: ActionsType[];
}
`;
