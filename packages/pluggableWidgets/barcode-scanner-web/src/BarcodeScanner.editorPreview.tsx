import { createElement, ReactElement } from "react";
import { BarcodeScannerPreviewProps } from "../typings/BarcodeScannerProps";
import { BarcodeScannerOverlay } from "./components/BarcodeScanner";

import previewQrCodeSvg from "./assets/previewQrCode.svg";

export function preview(props: BarcodeScannerPreviewProps): ReactElement {
    return (
        <BarcodeScannerOverlay showMask={props.showMask} class={props.class}>
            <img src={previewQrCodeSvg} className="design-preview-qr-code" />
        </BarcodeScannerOverlay>
    );
}

export function getPreviewCss(): string {
    return require("./ui/BarcodeScanner.scss") + require("./ui/BarcodeScannerPreview.scss");
}
