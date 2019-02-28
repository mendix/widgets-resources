/**
 * This file was generated from ProgressCircle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface ProgressCircleProps<Style> extends CommonProps<Style> {
    value?: EditableValue<BigJs.Big>;
    defaultValue: number;
    maximumValue?: EditableValue<BigJs.Big>;
    defaultMaximumValue: number;
    indeterminate: boolean;
    size: number;
    thickness: number;
    showsText: boolean;
    customText?: DynamicValue<string>;
    color?: string;
    unfilledColor?: string;
    borderColor?: string;
    borderWidth: number;
}
