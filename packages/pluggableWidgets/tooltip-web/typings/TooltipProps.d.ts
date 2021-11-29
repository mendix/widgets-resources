/**
 * This file was generated from Tooltip.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";

export type RenderMethodEnum = "text" | "custom";

export type TooltipPositionEnum = "top" | "left" | "bottom" | "right";

export type ArrowPositionEnum = "start" | "none" | "end";

export type OpenOnEnum = "click" | "hover" | "hoverFocus";

export interface TooltipContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    trigger: ReactNode;
    renderMethod: RenderMethodEnum;
    htmlMessage?: ReactNode;
    textMessage?: DynamicValue<string>;
    tooltipPosition: TooltipPositionEnum;
    arrowPosition: ArrowPositionEnum;
    openOn: OpenOnEnum;
}

export interface TooltipPreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    trigger: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    renderMethod: RenderMethodEnum;
    htmlMessage: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    textMessage: string;
    tooltipPosition: TooltipPositionEnum;
    arrowPosition: ArrowPositionEnum;
    openOn: OpenOnEnum;
}
