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
    minimumValueAttribute?: EditableValue<BigJs.Big>;
    minimumValueDefault: number;
    maximumValueAttribute?: EditableValue<BigJs.Big>;
    maximumValueDefault: number;
    stepSizeAttribute?: EditableValue<BigJs.Big>;
    stepSizeDefault: number;
    onSlide?: ActionValue;
    onChange?: ActionValue;
}
