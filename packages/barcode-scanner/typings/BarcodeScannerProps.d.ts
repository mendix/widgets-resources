/**
 * Auto-generated from BarcodeScanner.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface BarcodeScannerProps extends CommonProps {
    barcode: PluginWidget.EditableValue<string>;
    onChange?: PluginWidget.ActionValue;
}
