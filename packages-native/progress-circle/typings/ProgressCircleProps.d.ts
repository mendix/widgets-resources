/**
 * This file was generated from ProgressCircle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue } from "mendix";

export type CircleTextEnum = "percentage" | "customText" | "none";

export interface ProgressCircleProps<Style> {
    name: string;
    style: Style[];
    progressValue: DynamicValue<BigJs.Big>;
    minimumValue: DynamicValue<BigJs.Big>;
    maximumValue: DynamicValue<BigJs.Big>;
    circleText: CircleTextEnum;
    customText?: DynamicValue<string>;
}

export interface ProgressCirclePreviewProps {
    class: string;
    style: string;
    progressValue: string;
    minimumValue: string;
    maximumValue: string;
    circleText: CircleTextEnum;
    customText: string;
}
