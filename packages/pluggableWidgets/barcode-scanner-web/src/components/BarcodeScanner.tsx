import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useCodeScanner } from "../hooks/useCodeScanner";
import { browserSupportsCameraAccess, useMediaStream } from "../hooks/useMediaStream";

import "../ui/BarcodeScanner.scss";

export interface BarcodeScannerProps {
    onClose?: () => void;
    onDetect?: (data: string) => void;
    showMask: boolean;
}

export function BarcodeScanner({ onClose, onDetect, showMask }: BarcodeScannerProps): ReactElement | null {
    const [showScannerOverlay, setShowScannerOverlay] = useState<boolean>(true);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const hasDetectedOnce = useRef<boolean>(false);
    const { streamObject, cleanupStreamObject, error } = useMediaStream();
    const { codeResult } = useCodeScanner(streamObject, videoElement);
    const supportsCameraAccess = browserSupportsCameraAccess();

    const updateVideoElement = useCallback(
        (node: HTMLVideoElement | null) => {
            setVideoElement(node);
        },
        [setVideoElement]
    );

    const play = useCallback((event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        if (event.currentTarget.paused) {
            event.currentTarget.play(); // TODO: doesn't work on iOS safari
        }
    }, []);

    function onCloseOverlay(): void {
        setShowScannerOverlay(false);
        cleanupStreamObject();
    }

    useEffect(() => {
        if (videoElement && streamObject) {
            videoElement.srcObject = streamObject;
        }
    }, [streamObject, videoElement]);

    useEffect(() => {
        if (onDetect && codeResult && !hasDetectedOnce.current) {
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
        return <div>This browser is not compatible with the barcode scanner widget</div>; // TODO: improve message, since this will also show when no https is used in certain browsers
    }
    if (error && error !== "ERROR_NOT_ALLOWED") {
        return <div>{error}</div>;
    }
    return (
        <div className={classNames("widget-barcode-scanner-container")}>
            <video className={classNames("video")} ref={updateVideoElement} onCanPlay={play} />
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
                <div className={classNames("glyphicon", "glyphicon-remove")} />
            </button>
        </div>
    );
}
