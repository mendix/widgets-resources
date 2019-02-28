/**
 * This file was generated from BarcodeScanner.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface BarcodeScannerProps extends CommonProps {
    barcode: EditableValue<string>;
    onChange?: ActionValue;
}
