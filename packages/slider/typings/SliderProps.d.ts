/**
 * This file was generated from Slider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export type EditableEnum = "default" | "never";

export interface SliderProps extends CommonProps {
    value: EditableValue<BigJs.Big>;
    minimumValue?: EditableValue<BigJs.Big>;
    maximumValue?: EditableValue<BigJs.Big>;
    defaultMinimumValue: number;
    defaultMaximumValue: number;
    editable: EditableEnum;
    onChange?: ActionValue;
    onSlidingComplete?: ActionValue;
    step?: EditableValue<BigJs.Big>;
    defaultStep: number;
    selectedTrackColor?: string;
    trackColor?: string;
    handleColor?: string;
}
