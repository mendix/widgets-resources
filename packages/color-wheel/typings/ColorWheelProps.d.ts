/**
 * This file was generated from ColorWheel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface ColorWheelProps extends CommonProps {
    color: EditableValue<string>;
    onChange?: ActionValue;
    onChangeComplete?: ActionValue;
    handleSize: number;
}
