/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface ProgressBarProps extends CommonProps {
    value?: EditableValue<BigJs.Big>;
    defaultValue: number;
    maximumValue?: EditableValue<BigJs.Big>;
    defaultMaximumValue: number;
    indeterminate: boolean;
    height: number;
    color?: string;
    unfilledColor?: string;
    borderColor?: string;
    borderWidth: number;
    borderRadius: number;
}
