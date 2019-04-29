const listImageWebOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { pages } from "mendixmodelsdk";
import { DynamicValue, WebImage } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface ActionsType {
    image: DynamicValue<WebImage>;
}

export interface ActionsPreviewType {
    image: WebImage;
}

export interface ActionsVisibilityType {
    image: boolean;
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
const listImageNativeOutput = `/**
 * This file was generated from MyWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, NativeImage } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps<Style> {
    style: Style[];
}

export interface ActionsType {
    image: DynamicValue<NativeImage>;
}

export interface MyWidgetProps<Style> extends CommonProps<Style> {
    actions: ActionsType[];
}
`;

module.exports = {listImageWebOutput, listImageNativeOutput};
