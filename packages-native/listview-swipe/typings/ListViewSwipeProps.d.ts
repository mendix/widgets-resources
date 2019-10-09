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

export type LeftRenderModeEnum = "disabled" | "action" | "buttons";

export type RightRenderModeEnum = "disabled" | "action" | "buttons";

export interface ListViewSwipeProps<Style> extends CommonProps<Style> {
    content: ReactNode;
    leftRenderMode: LeftRenderModeEnum;
    left?: ReactNode;
    onSwipeLeft?: ActionValue;
    closeOnFinishLeft: boolean;
    rightRenderMode: RightRenderModeEnum;
    right?: ReactNode;
    onSwipeRight?: ActionValue;
    closeOnFinishRight: boolean;
}
