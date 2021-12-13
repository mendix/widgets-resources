/**
 * This file was generated from ProgressCircle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";
import { Big } from "big.js";

export type CircleTextEnum = "percentage" | "customText" | "none";

export interface ProgressCircleProps<Style> {
    name: string;
    style: Style[];
    progressValue: DynamicValue<Big>;
    minimumValue: DynamicValue<Big>;
    maximumValue: DynamicValue<Big>;
    circleText: CircleTextEnum;
    customText?: DynamicValue<string>;
}

export interface ProgressCirclePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    progressValue: string;
    minimumValue: string;
    maximumValue: string;
    circleText: CircleTextEnum;
    customText: string;
}
