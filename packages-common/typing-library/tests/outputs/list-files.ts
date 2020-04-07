export const listFileWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, FileValue } from "mendix";

export interface ActionsType {
    file: DynamicValue<FileValue>;
}

export interface ActionsPreviewType {
    file: string;
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
`;
export const listFileNativeOutput = `export interface ActionsType {
    file: DynamicValue<FileValue>;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    actions: ActionsType[];
}`;
