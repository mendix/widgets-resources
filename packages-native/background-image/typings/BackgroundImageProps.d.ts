/**
 * This file was generated from BackgroundImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue, NativeImage } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type ImageResizeModeEnum = "cover" | "contain" | "stretch" | "repeat" | "center";

export interface BackgroundImageProps<Style> extends CommonProps<Style> {
    image: DynamicValue<NativeImage>;
    imageResizeMode: ImageResizeModeEnum;
    imageOpacity: BigJs.Big;
    content?: ReactNode;
}
