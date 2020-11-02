/**
 * This file was generated from ListViewSwipe.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue } from "mendix";

export type LeftRenderModeEnum = "disabled" | "buttons" | "archive" | "swipeOutReset" | "toggle";

export type RightRenderModeEnum = "disabled" | "buttons" | "archive" | "swipeOutReset" | "toggle";

export interface ListViewSwipeProps<Style> {
    name: string;
    style: Style[];
    content: ReactNode;
    left?: ReactNode;
    leftRenderMode: LeftRenderModeEnum;
    onSwipeLeft?: ActionValue;
    right?: ReactNode;
    rightRenderMode: RightRenderModeEnum;
    onSwipeRight?: ActionValue;
}

export interface ListViewSwipePreviewProps {
    class: string;
    style: string;
    content: { widgetCount: number; renderer: ComponentType };
    left: { widgetCount: number; renderer: ComponentType };
    leftRenderMode: LeftRenderModeEnum;
    onSwipeLeft: {} | null;
    right: { widgetCount: number; renderer: ComponentType };
    rightRenderMode: RightRenderModeEnum;
    onSwipeRight: {} | null;
}
