/**
 * This file was generated from BarcodeScanner.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface BarcodeScannerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: EditableValue<string>;
    showMask: boolean;
    onDetect?: ActionValue;
}

export interface BarcodeScannerPreviewProps {
    class: string;
    style: string;
    datasource: string;
    showMask: boolean;
    onDetect: {} | null;
}
