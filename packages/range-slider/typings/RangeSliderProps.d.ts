/**
 * This file was generated from RangeSlider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export type EditableEnum = "default" | "never";

export interface RangeSliderProps<Style> extends CommonProps<Style> {
    lowerValue: EditableValue<BigJs.Big>;
    upperValue: EditableValue<BigJs.Big>;
    editable: EditableEnum;
    minimumValue?: EditableValue<BigJs.Big>;
    defaultMinimumValue: number;
    maximumValue?: EditableValue<BigJs.Big>;
    defaultMaximumValue: number;
    step?: EditableValue<BigJs.Big>;
    defaultStep: number;
    onChange?: ActionValue;
    onChangeComplete?: ActionValue;
}
