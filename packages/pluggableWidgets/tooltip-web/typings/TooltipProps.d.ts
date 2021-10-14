/**
 * This file was generated from Tooltip.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";

export type RenderEnum = "text" | "custom";

export type PositionEnum =
    | "topStart"
    | "top"
    | "topEnd"
    | "leftStart"
    | "left"
    | "leftEnd"
    | "bottomStart"
    | "bottom"
    | "bottomEnd"
    | "rightStart"
    | "right"
    | "rightEnd";

export type OpenOnEnum = "click" | "hover" | "hoverFocus";

export interface TooltipContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    trigger: ReactNode;
    render: RenderEnum;
    content?: ReactNode;
    tooltipString?: DynamicValue<string>;
    position: PositionEnum;
    openOn: OpenOnEnum;
}

export interface TooltipPreviewProps {
    class: string;
    style: string;
    trigger: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    render: RenderEnum;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    tooltipString: string;
    position: PositionEnum;
    openOn: OpenOnEnum;
}
