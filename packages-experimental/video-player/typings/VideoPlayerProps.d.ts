/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface VideoPlayerContainerProps extends CommonProps {
    urlAttribute?: PluginWidget.EditableValue<string>;
    urlStatic?: string;
    posterAttribute?: PluginWidget.EditableValue<string>;
    posterImageUrl?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    aspectRatio: boolean;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface VideoPlayerWebModelerProps extends CommonProps {
    urlAttribute?: string;
    urlStatic?: string;
    posterAttribute?: string;
    posterImageUrl?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    aspectRatio: boolean;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface VisibilityMap {
    urlAttribute: boolean;
    urlStatic: boolean;
    posterAttribute: boolean;
    posterImageUrl: boolean;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: boolean;
    width: boolean;
    aspectRatio: boolean;
    heightUnit: boolean;
    height: boolean;
}
