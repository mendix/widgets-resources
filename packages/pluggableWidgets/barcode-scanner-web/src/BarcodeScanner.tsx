import { createElement, FunctionComponent, useCallback } from "react";
import { BarcodeScannerContainerProps } from "../typings/BarcodeScannerProps";
import { BarcodeScanner as BarcodeScannerComponent } from "./components/BarcodeScanner";

export const BarcodeScanner: FunctionComponent<BarcodeScannerContainerProps> = props => {
    const onClose = useCallback(() => props.onClose?.execute(), [props.onClose]);
    return <BarcodeScannerComponent onClose={props.onClose ? onClose : undefined} />;
};
