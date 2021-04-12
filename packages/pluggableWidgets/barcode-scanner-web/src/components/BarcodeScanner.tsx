import { createElement, ReactElement, useCallback, useEffect, useState } from "react";

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
        videoElement?.play();
    }, [videoElement]);

    useEffect(() => {
        if (streamObject && videoElement) {
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

    if (!supportsCameraAccess) {
        // Mendix ensures that Mendix apps are only run in the supported browsers and all of them
        // support the `navigator.mediaDevices.getUserMedia` API. So no additional error handling
        // needs to be done, but just in case we soft catch it.
        return <div>This browser is not compatible with the barcode scanner widget</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return streamObject ? <video ref={updateVideoElement} onCanPlay={play} /> : <div>Waiting for permission</div>;
}
