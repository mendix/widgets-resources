export const iconWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, WebIcon } from "mendix";

export interface IconsType {
    firstIcon: DynamicValue<WebIcon>;
    secondIcon: DynamicValue<WebIcon>;
}

export interface IconsPreviewType {
    firstIcon: IconPreview;
    secondIcon: IconPreview;
}

export interface MyWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    icons: IconsType[];
}

export interface MyWidgetPreviewProps {
    class: string;
    style: string;
    icons: IconsPreviewType[];
}

export interface VisibilityMap {
    icons: boolean | Array<{
        firstIcon: boolean;
        secondIcon: boolean;
    }>;
}
`;

export const iconNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Content Team
 */
import { DynamicValue, NativeIcon } from "mendix";

export interface IconsType {
    firstIcon: DynamicValue<NativeIcon>;
    secondIcon: DynamicValue<NativeIcon>;
}

export interface MyWidgetProps<Style> {
    name: string;
    style: Style[];
    icons: IconsType[];
}
`;
