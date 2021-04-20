import { createElement, ReactElement } from "react";
import { BarcodeScannerPreviewProps } from "../typings/BarcodeScannerProps";
import { BarcodeScanner } from "./components/BarcodeScanner";

export function preview(_props: BarcodeScannerPreviewProps): ReactElement {
    return <BarcodeScanner onClose={undefined} />;
}
