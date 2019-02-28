/**
 * This file was generated from SegmentedControl.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export type EditableEnum = "default" | "never";

export interface SegmentedControlProps extends CommonProps {
    enum: EditableValue<string>;
    editable: EditableEnum;
    onChange?: ActionValue;
}
