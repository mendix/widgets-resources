/**
 * This file was generated from ListViewSwipe.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type LeftRenderModeEnum = "disabled" | "buttons" | "archive" | "toggle" | "swipeOutReset" | "swipeOut";

export type RightRenderModeEnum = "disabled" | "buttons" | "archive" | "toggle" | "swipeOutReset" | "swipeOut";

export interface ListViewSwipeProps<Style> extends CommonProps<Style> {
    content: ReactNode;
    left?: ReactNode;
    leftRenderMode: LeftRenderModeEnum;
    onSwipeLeft?: ActionValue;
    leftThresholdAttribute?: EditableValue<boolean>;
    right?: ReactNode;
    rightRenderMode: RightRenderModeEnum;
    onSwipeRight?: ActionValue;
    rightThresholdAttribute?: EditableValue<boolean>;
}
