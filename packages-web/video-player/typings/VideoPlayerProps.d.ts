/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "aspectRatio" | "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface VideoPlayerContainerProps extends CommonProps {
    urlExpression: DynamicValue<string>;
    posterExpression?: DynamicValue<string>;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface VideoPlayerPreviewProps extends CommonProps {
    urlExpression: string;
    posterExpression?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface VisibilityMap {
    urlExpression: boolean;
    posterExpression: boolean;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: boolean;
    width: boolean;
    heightUnit: boolean;
    height: boolean;
}
