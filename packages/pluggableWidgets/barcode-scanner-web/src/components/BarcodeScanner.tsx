import { createElement, ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Alert } from "@mendix/piw-utils-internal";
import { useCodeScanner, CodeScannerHookError } from "../hooks/useCodeScanner";
import { browserSupportsCameraAccess, useMediaStream, MediaStreamHookError } from "../hooks/useMediaStream";

import closeIconSvg from "../assets/ic24-close.svg";
import "../ui/BarcodeScanner.scss";

export interface BarcodeScannerProps {
    onClose?: () => void;
    onDetect?: (data: string) => void;
    showMask: boolean;
}

function getErrorMessage(errorEnum: MediaStreamHookError | CodeScannerHookError | null): string | null {
    switch (errorEnum) {
        case "ERROR_NOT_FOUND":
            return "Error in barcode scanner: no camera media devices were found.";
        case "ERROR_MEDIA_STREAM":
            return "Error in barcode scanner: an unexpected error occurred while retrieving the camera media stream.";
        case "ERROR_CODE_SCANNER":
            return "Error in barcode scanner: an unexpected error occurred while detecting a barcode in the camera media stream.";
        case "ERROR_NOT_ALLOWED":
        default:
            return null;
    }
}

export function BarcodeScanner({ onClose, onDetect, showMask }: BarcodeScannerProps): ReactElement | null {
    const [showScannerOverlay, setShowScannerOverlay] = useState<boolean>(true);
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const hasDetectedOnce = useRef<boolean>(false);
    const { streamObject, cleanupStreamObject, error: errorMediaStream } = useMediaStream();
    const { codeResult, error: errorCodeScanner } = useCodeScanner(streamObject, videoElement.current);
    const supportsCameraAccess = browserSupportsCameraAccess();

    function onCloseOverlay(): void {
        setShowScannerOverlay(false);
        cleanupStreamObject();
    }

    // If both the video element ref and the camera stream object are ready, display it through the `srcObject` prop.
    useEffect(() => {
        if (videoElement.current && streamObject) {
            videoElement.current.srcObject = streamObject;
        }
    }, [streamObject]);

    // If we have an onDetect handler and a barcode has been scanned and it was the first detected code, trigger the onDetect handler.
    useEffect(() => {
        if (onDetect && codeResult && !hasDetectedOnce.current) {
            // We need to keep track of this because running `onDetect` affects the `props.datasource` one level up, which then changes
            // the `onDetect` callback, which then triggers this `useEffect`again, causing an infinite loop. This cycle doesn't affect
            // the UI in any way tho, so we keep track of it inside a ref rather than state.
            hasDetectedOnce.current = true;
            onDetect(codeResult);
        }
    }, [codeResult, onDetect]);

    if (!showScannerOverlay) {
        return null;
    }
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
    if ((errorMediaStream && errorMediaStream !== "ERROR_NOT_ALLOWED") || errorCodeScanner) {
        const errorMessage = getErrorMessage(errorMediaStream || errorCodeScanner);
        if (errorMessage) {
            return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
        }
    }
    return (
        <div className={classNames("mx-barcode-scanner")}>
            <video
                className={classNames("video")}
                ref={videoElement}
                onCanPlay={event => {
                    if (event.currentTarget.paused) {
                        event.currentTarget.play();
                    }
                }}
            />
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
            <button className={classNames("btn btn-image btn-icon close-button")} onClick={onClose || onCloseOverlay}>
                <img src={closeIconSvg} className={classNames("removeIcon")} alt="Close icon for the canvas overlay" />
            </button>
        </div>
    );
}
