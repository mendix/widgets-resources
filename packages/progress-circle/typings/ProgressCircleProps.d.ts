/**
 * This file was generated from ProgressCircle.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface ProgressCircleProps extends CommonProps {
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
