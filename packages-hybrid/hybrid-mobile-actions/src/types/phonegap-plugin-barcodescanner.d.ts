interface CordovaPlugins {
    barcodeScanner?: CordovaBarcodeScanner;
}

interface CordovaBarcodeScanner {
    scan(
        success?: (result: CordovaBarcodeScannerResult) => void,
        error?: (error: string) => void,
        options?: CordovaBarcodeScannerOptions
    );
}

interface CordovaBarcodeScannerResult {
    text: string;
    format: CordovaBarcodeScannerFormat;
    cancelled: boolean;
}

interface CordovaBarcodeScannerOptions {
    /** iOS and Android */
    preferFrontCamera: boolean;
    /** iOS and Android */
    showFlipCameraButton: boolean;
    /** iOS and Android */
    showTorchButton: boolean;
    /** Android, launch with the torch switched on (if available) */
    torchOn: boolean;
    /** Android, save scan history (default false) */
    saveHistory: boolean;
    /** Android */
    prompt: string;
    /** Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 */
    resultDisplayDuration: number;
    /** default: all but PDF_417 and RSS_EXPANDED */
    formats: string;
    /** Android only (portrait|landscape), default unset so it rotates with the device */
    orientation: "portrait" | "landscape";
    /** iOS */
    disableAnimations: boolean;
    /** iOS and Android */
    disableSuccessBeep: boolean;
}

type CordovaBarcodeScannerFormat =
    | "QR_CODE"
    | "DATA_MATRIX"
    | "UPC_A"
    | "UPC_E"
    | "EAN_8"
    | "EAN_13"
    | "CODE_39"
    | "CODE_93"
    | "CODE_128"
    | "CODABAR"
    | "ITF"
    | "RSS14"
    | "PDF_417"
    | "RSS_EXPANDED"
    | "MSI"
    | "AZTEC";
