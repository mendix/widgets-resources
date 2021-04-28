import { useCallback, useEffect, useState } from "react";

export type MediaStreamHookError = "ERROR_NOT_FOUND" | "ERROR_NOT_ALLOWED" | "ERROR_MEDIA_STREAM";

type MediaStreamHook = () => {
    streamObject: MediaStream | null;
    error: MediaStreamHookError | null;
    cleanupStreamObject: () => void;
};

export function browserSupportsCameraAccess(): boolean {
    return "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;
}

const mediaStreamConstraints: MediaStreamConstraints = {
    audio: false,
    video: {
        facingMode: "environment",
        width: { min: 1280, ideal: 1920, max: 2560 },
        height: { min: 720, ideal: 1080, max: 1440 }
    }
};

export const useMediaStream: MediaStreamHook = () => {
    const [streamObject, setStreamObject] = useState<MediaStream | null>(null);
    const [error, setError] = useState<MediaStreamHookError | null>(null);
    const supportsCameraAccess = browserSupportsCameraAccess();

    const cleanupStreamObject = useCallback(() => {
        streamObject?.getVideoTracks().forEach(track => track.stop());
    }, [streamObject]);

    useEffect(() => {
        let stream: MediaStream | null;
        let isCanceled = false;
        async function getStream(): Promise<void> {
            try {
                stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
                if (!isCanceled) {
                    setStreamObject(stream);
                }
            } catch (e) {
                if (e instanceof Error && !isCanceled) {
                    switch (e.name) {
                        case "NotFoundError":
                            setError("ERROR_NOT_FOUND");
                            break;
                        case "NotAllowedError":
                            setError("ERROR_NOT_ALLOWED");
                            break;
                        default:
                            setError("ERROR_MEDIA_STREAM");
                            break;
                    }
                }
            }
        }
        if (supportsCameraAccess && !streamObject) {
            getStream();
        }
        return () => {
            isCanceled = true;
            cleanupStreamObject();
        };
    }, [supportsCameraAccess, streamObject, cleanupStreamObject]);

    return { streamObject, cleanupStreamObject, error };
};
