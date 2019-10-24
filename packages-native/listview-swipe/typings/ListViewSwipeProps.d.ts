/**
 * This file was generated from ListViewSwipe.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type LeftRenderModeEnum = "disabled" | "buttons" | "archive" | "swipeOutReset" | "toggle";

export type RightRenderModeEnum = "disabled" | "buttons" | "archive" | "swipeOutReset" | "toggle";

export interface ListViewSwipeProps<Style> extends CommonProps<Style> {
    content: ReactNode;
    left?: ReactNode;
    leftRenderMode: LeftRenderModeEnum;
    onSwipeLeft?: ActionValue;
    right?: ReactNode;
    rightRenderMode: RightRenderModeEnum;
    onSwipeRight?: ActionValue;
}
