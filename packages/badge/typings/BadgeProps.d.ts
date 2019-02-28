/**
 * This file was generated from Badge.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export type TypeEnum = "badge" | "label";

export type ColorEnum = "default" | "primary" | "success" | "info" | "warning" | "danger";

export interface BadgeProps extends CommonProps {
    value?: EditableValue<string | BigJs.Big>;
    defaultValue?: string;
    onClick?: ActionValue;
    type: TypeEnum;
    color: ColorEnum;
}
