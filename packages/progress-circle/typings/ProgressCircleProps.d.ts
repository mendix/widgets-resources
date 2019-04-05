/**
 * This file was generated from ProgressCircle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export type CircleTextEnum = "percentage" | "customText" | "none";

export interface ProgressCircleProps<Style> extends CommonProps<Style> {
    valueAttribute?: EditableValue<BigJs.Big>;
    valueDefault: number;
    maximumValueAttribute?: EditableValue<BigJs.Big>;
    maximumValueDefault: number;
    circleText: CircleTextEnum;
    customText?: DynamicValue<string>;
}
