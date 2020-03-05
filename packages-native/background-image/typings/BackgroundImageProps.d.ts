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

export interface BackgroundImageProps<Style> extends CommonProps<Style> {
    backgroundImage: DynamicValue<NativeImage>;
    content?: ReactNode;
}
