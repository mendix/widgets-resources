/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface VideoPlayerContainerProps extends CommonProps {
    urlAttribute?: EditableValue<string>;
    urlStatic?: string;
    posterAttribute?: EditableValue<string>;
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

export interface VideoPlayerPreviewProps extends CommonProps {
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
