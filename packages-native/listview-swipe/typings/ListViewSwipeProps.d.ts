/**
 * This file was generated from ListViewSwipe.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export type LeftRenderModeEnum = "disabled" | "action" | "buttons";

export type RightRenderModeEnum = "disabled" | "action" | "buttons";

export interface ListViewSwipeProps<Style> extends CommonProps<Style> {
    content: any;
    animateOnStart: boolean;
    onPress?: ActionValue;
    leftRenderMode: LeftRenderModeEnum;
    left?: any;
    onSwipeLeft?: ActionValue;
    rightRenderMode: RightRenderModeEnum;
    right?: any;
    onSwipeRight?: ActionValue;
}
