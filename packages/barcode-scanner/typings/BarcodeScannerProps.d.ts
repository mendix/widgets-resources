/**
 * This file was generated from BarcodeScanner.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface BarcodeScannerProps<Style> extends CommonProps<Style> {
    barcode: EditableValue<string>;
    onDetect?: ActionValue;
}
