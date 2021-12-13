/**
 * This file was generated from BarcodeScanner.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface BarcodeScannerProps<Style> {
    name: string;
    style: Style[];
    barcode: EditableValue<string>;
    showMask: boolean;
    showAnimatedLine: boolean;
    onDetect?: ActionValue;
}

export interface BarcodeScannerPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    barcode: string;
    showMask: boolean;
    showAnimatedLine: boolean;
    onDetect: {} | null;
}
