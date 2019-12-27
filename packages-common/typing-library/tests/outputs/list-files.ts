export const listFileWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { DynamicValue, FileValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface ActionsType {
    file: DynamicValue<FileValue>;
}

export interface ActionsPreviewType {
    file: FileValue;
}

export interface ActionsVisibilityType {
    file: boolean;
}

export interface MyWidgetContainerProps extends CommonProps {
    actions: ActionsType[];
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    actions: ActionsPreviewType[];
}

export interface VisibilityMap {
    actions: ActionsVisibilityType[] | boolean;
}
`;
export const listFileNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, FileValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface ActionsType {
    file: DynamicValue<FileValue>;
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    actions: ActionsType[];
}
`;
