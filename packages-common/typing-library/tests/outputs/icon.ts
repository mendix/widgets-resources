export const iconWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { DynamicValue, WebIcon } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface IconsType {
    firstIcon: DynamicValue<WebIcon>;
    secondIcon: DynamicValue<WebIcon>;
}

export interface IconsPreviewType {
    firstIcon: WebIcon;
    secondIcon: WebIcon;
}

export interface IconsVisibilityType {
    firstIcon: boolean;
    secondIcon: boolean;
}

export interface MyWidgetContainerProps extends CommonProps {
    icons: IconsType[];
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    icons: IconsPreviewType[];
}

export interface VisibilityMap {
    icons: IconsVisibilityType[] | boolean;
}
`;

export const iconNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, NativeIcon } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface IconsType {
    firstIcon: DynamicValue<NativeIcon>;
    secondIcon: DynamicValue<NativeIcon>;
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    icons: IconsType[];
}
`;
