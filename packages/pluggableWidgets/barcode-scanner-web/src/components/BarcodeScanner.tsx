import { createElement, ReactElement, useCallback, useEffect, useState } from "react";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";
import classNames from "classnames";

import "../ui/BarcodeScanner.scss";

export interface BarcodeScannerProps {
    onClose?: () => void;
    onDetect?: (data: string) => void;
    showMask: boolean;
}

const hints = new Map();
const formats = Object.values(BarcodeFormat).filter(format => typeof format !== "string") as BarcodeFormat[];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

export function BarcodeScanner({ onClose, onDetect, showMask }: BarcodeScannerProps): ReactElement | null {
    const [showScannerOverlay, setShowScannerOverlay] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>();
    const [streamObject, setStreamObject] = useState<MediaStream | null>(null);
    const supportsCameraAccess = "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

    const toggleOverlay = useCallback(() => {
        setShowScannerOverlay(showScannerOverlayCurrent => !showScannerOverlayCurrent);
    }, []);

    const updateVideoElement = useCallback(
        (node: HTMLVideoElement | null) => {
            setVideoElement(node);
        },
        [setVideoElement]
    );

    const play = useCallback(() => {
        videoElement?.play(); // TODO: doesn't work on iOS safari
    }, [videoElement]);

    const cleanupStreamObject = useCallback((stream: MediaStream | null) => {
        stream?.getVideoTracks().forEach(track => track.stop());
    }, []);

    useEffect(() => {
        if (videoElement) {
            videoElement.srcObject = streamObject;
        }
    }, [streamObject, videoElement]);

    useEffect(() => {
        let stream: MediaStream | null;
        async function getStream(): Promise<void> {
            if (supportsCameraAccess) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: "environment",
                            width: { min: 640, ideal: 1280, max: 1920 },
                            height: { min: 480, ideal: 720, max: 1080 }
                        }
                    });
                    setStreamObject(stream);
                } catch (e) {
                    if (e instanceof Error) {
                        switch (e.name) {
                            // TODO: personalize this.
                            case "NotFoundError":
                            case "NotAllowedError":
                            default:
                                setError(e.message);
                                break;
                        }
                    }
                }
            }
        }
        getStream();
        return () => {
            cleanupStreamObject(stream);
        };
    }, [supportsCameraAccess, setError, cleanupStreamObject]);

    useEffect(() => {
        async function check(): Promise<void> {
            if (streamObject) {
                const browserReader = new BrowserMultiFormatReader(hints);
                try {
                    if (videoElement) {
                        const result = await browserReader.decodeOnceFromStream(streamObject, videoElement);
                        // TODO: Do something with the result
                        console.log({ result });
                        onDetect?.(result.getText());
                        cleanupStreamObject(streamObject);
                    }
                } catch (e) {
                    // TODO: handle error case
                    console.log("something went wrong", e);
                }
            }
        }
        check();
    }, [streamObject, videoElement, cleanupStreamObject, onDetect]);

    if (!showScannerOverlay) {
        return null;
    }
    if (!supportsCameraAccess) {
        // Mendix ensures that Mendix apps are only run in the supported browsers and all of them
        // support the `navigator.mediaDevices.getUserMedia` API. So no additional error handling
        // needs to be done, but just in case we soft catch it.
        return <div>This browser is not compatible with the barcode scanner widget</div>; // TODO: improve message, since this will also show when no https is used in certain browsers
    }
    if (error) {
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
            <button className={classNames("btn btn-image btn-icon close-button")} onClick={onClose || toggleOverlay}>
                <div className={classNames("glyphicon", "glyphicon-remove")} />
            </button>
        </div>
    );
}
