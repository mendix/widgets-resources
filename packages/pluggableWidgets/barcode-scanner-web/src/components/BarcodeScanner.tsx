import { createElement, ReactElement, ReactNode, useCallback, SyntheticEvent } from "react";
import classNames from "classnames";
import { Alert } from "@mendix/piw-utils-internal/components/web";
import { Dimensions, getDimensions } from "@mendix/piw-utils-internal";
import { useCustomErrorMessage } from "../hooks/useCustomErrorMessage";
import { useReader } from "../hooks/useReader";

import "../ui/BarcodeScanner.scss";

interface BarcodeScannerOverlayProps extends Dimensions {
    showMask: boolean;
    class: string;
    children?: ReactNode;
}

export function BarcodeScannerOverlay({
    children,
    class: className,
    showMask,
    ...dimensions
}: BarcodeScannerOverlayProps): ReactElement {
    return (
        <div className={classNames("mx-barcode-scanner", className)} style={getDimensions(dimensions)}>
            <div className={classNames("mx-barcode-scanner-content")}>
                {children}
                {showMask ? (
                    <div className={classNames("video-canvas")}>
                        <div className={classNames("canvas-left", "canvas-background")} />
                        <div className={classNames("canvas-middle")}>
                            <div className={classNames("canvas-middle-top", "canvas-background")} />
                            <div className={classNames("canvas-middle-middle")}>
                                <div className={classNames("corner", "corner-top-left")} />
                                <div className={classNames("corner", "corner-top-right")} />
                                <div className={classNames("corner", "corner-bottom-right")} />
                                <div className={classNames("corner", "corner-bottom-left")} />
                            </div>
                            <div className={classNames("canvas-middle-bottom", "canvas-background")} />
                        </div>
                        <div className={classNames("canvas-right", "canvas-background")} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export interface BarcodeScannerProps extends Dimensions {
    onDetect?: (data: string) => void;
    showMask: boolean;
    class: string;
}

export function BarcodeScanner({
    onDetect,
    showMask,
    class: className,
    ...dimensions
}: BarcodeScannerProps): ReactElement | null {
    const [errorMessage, setError] = useCustomErrorMessage();
    const videoRef = useReader({ onSuccess: onDetect, onError: setError });
    const supportsCameraAccess = typeof navigator?.mediaDevices?.getUserMedia === "function";
    const onCanPlay = useCallback((event: SyntheticEvent<HTMLVideoElement>) => {
        if (event.currentTarget.paused) {
            event.currentTarget.play();
        }
    }, []);

    if (!supportsCameraAccess) {
        // Mendix ensures that Mendix apps are only run in the supported browsers and all of them
        // support the `navigator.mediaDevices.getUserMedia` API. So no additional error handling
        // needs to be done, but just in case we soft catch it.
        return (
            <Alert bootstrapStyle="danger">
                The barcode scanner widget is only compatible with certain browsers and requires a secure HTTPS
                connection in certain browsers. If you encounter this error message as an user, please contact your
                system administrator. If you are a Mendix developer, please refer to the appropriate docs on how to
                resolve this issue.
            </Alert>
        );
    }

    if (errorMessage) {
        return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
    }

    return (
        <BarcodeScannerOverlay class={className} showMask={showMask} {...dimensions}>
            <video className="video" ref={videoRef} onCanPlay={onCanPlay} />
        </BarcodeScannerOverlay>
    );
}
