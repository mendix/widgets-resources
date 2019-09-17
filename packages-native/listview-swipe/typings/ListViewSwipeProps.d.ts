/**
 * This file was generated from ListViewSwipe.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue } from "mendix";

interface CommonProps<Style> {
    style: Style[];
}

export interface ListViewSwipeProps<Style> extends CommonProps<Style> {
    content: any;
    onPress?: ActionValue;
    left?: any;
    onSwipeLeft?: ActionValue;
    right?: any;
    onSwipeRight?: ActionValue;
}
