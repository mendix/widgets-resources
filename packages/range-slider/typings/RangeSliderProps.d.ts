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
    lowerValueAttribute: EditableValue<BigJs.Big>;
    upperValueAttribute: EditableValue<BigJs.Big>;
    editable: EditableEnum;
    minimumValue: DynamicValue<BigJs.Big>;
    maximumValue: DynamicValue<BigJs.Big>;
    stepSize: DynamicValue<BigJs.Big>;
    onSlide?: ActionValue;
    onChange?: ActionValue;
}
