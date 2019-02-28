/**
 * This file was generated from QRCode.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface QRCodeProps extends CommonProps {
    value: EditableValue<string>;
    size: number;
    color: string;
    backgroundColor: string;
}
