import { executeAction } from "@mendix/piw-utils-internal";
import { ValueStatus } from "mendix";
import { createElement, FunctionComponent, useCallback } from "react";
import { BarcodeScannerContainerProps } from "../typings/BarcodeScannerProps";
import { BarcodeScanner as BarcodeScannerComponent } from "./components/BarcodeScanner";

export const BarcodeScanner: FunctionComponent<BarcodeScannerContainerProps> = props => {
    const onDetect = useCallback(
        (data: string) => {
            if (props.datasource?.status !== ValueStatus.Available) {
                return;
            }
            if (data !== props.datasource.value) {
                props.datasource.setValue(data);
            }
            executeAction(props.onDetect);
        },
        [props.onDetect, props.datasource]
    );
    return (
        <BarcodeScannerComponent
            onDetect={props.onDetect ? onDetect : undefined}
            showMask={props.showMask}
            class={props.class}
            heightUnit={props.heightUnit}
            height={props.height}
            widthUnit={props.widthUnit}
            width={props.width}
        />
    );
};
