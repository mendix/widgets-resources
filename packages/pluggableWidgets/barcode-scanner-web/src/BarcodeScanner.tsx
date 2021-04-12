import { createElement, FunctionComponent } from "react";
import { BarcodeScannerContainerProps } from "../typings/BarcodeScannerProps";
import { BarcodeScanner as BarcodeScannerComponent } from "./components/BarcodeScanner";

export const BarcodeScanner: FunctionComponent<BarcodeScannerContainerProps> = _props => {
    return <BarcodeScannerComponent />;
};
