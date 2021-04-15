import { createElement, ReactElement, useCallback, useEffect, useState } from "react";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BarcodeScannerProps {}

export function BarcodeScanner(_props: BarcodeScannerProps): ReactElement {
    const [error, setError] = useState<string>();
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>();
    const [streamObject, setStreamObject] = useState<MediaStream | null>(null);
    const supportsCameraAccess = "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

    const updateVideoElement = useCallback(
        (node: HTMLVideoElement | null) => {
            setVideoElement(node);
        },
        [setVideoElement]
    );

    const play = useCallback(() => {
        videoElement?.play(); // TODO: doesn't work on iOS safari
    }, [videoElement]);

    useEffect(() => {
        if (videoElement) {
            videoElement.srcObject = streamObject;
        }
    }, [streamObject, videoElement]);

    useEffect(() => {
        async function getStream(): Promise<void> {
            if (supportsCameraAccess) {
                let stream;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    }, [supportsCameraAccess, setError]);

    useEffect(() => {
        async function check(): Promise<void> {
            if (streamObject) {
                const hints = new Map();
                // TODO: Support all formats.
                const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.UPC_A];

                hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

                const browserReader = new BrowserMultiFormatReader(hints);

                try {
                    if (videoElement) {
                        const result = await browserReader.decodeOnceFromStream(streamObject, videoElement);
                        // TODO: Do something with the result
                        console.log({ result });
                        // TODO: Handle stopping the stream and cleaning stuff up, since right now it stays open forever.
                    }
                } catch (e) {
                    // TODO: handle error case
                    console.log("something went wrong", e);
                }
            }
        }
        check();
    }, [streamObject, videoElement]);

    if (!supportsCameraAccess) {
        // Mendix ensures that Mendix apps are only run in the supported browsers and all of them
        // support the `navigator.mediaDevices.getUserMedia` API. So no additional error handling
        // needs to be done, but just in case we soft catch it.
        return <div>This browser is not compatible with the barcode scanner widget</div>; // TODO: improve message, since this will also show when no https is used in certain browsers
    }
    if (error) {
        return <div>{error}</div>;
    }
    return streamObject ? <video ref={updateVideoElement} onCanPlay={play} /> : <div>Waiting for permission</div>;
}
