/**
 * This file was generated from BottomDrawer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue, EditableValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type DistanceUnitEnum = "pixel" | "percentage";

export interface SnapPointsType {
    distance: number;
    distanceUnit: DistanceUnitEnum;
}

export interface BottomDrawerProps<Style> extends CommonProps<Style> {
    headerContent?: ReactNode;
    mainContent?: ReactNode;
    snapPoints: SnapPointsType[];
    currentSnapPointIndex: EditableValue<BigJs.Big>;
    onCurrentSnapPointIndexChange?: ActionValue;
}
