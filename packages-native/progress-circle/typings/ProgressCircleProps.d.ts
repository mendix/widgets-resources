/**
 * This file was generated from ProgressCircle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type CircleTextEnum = "percentage" | "customText" | "none";

export interface ProgressCircleProps<Style> extends CommonProps<Style> {
    progressValue: DynamicValue<BigJs.Big>;
    minimumValue: DynamicValue<BigJs.Big>;
    maximumValue: DynamicValue<BigJs.Big>;
    circleText: CircleTextEnum;
    customText?: DynamicValue<string>;
}
