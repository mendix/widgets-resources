import { useCallback, useEffect, useState } from "react";

type MediaStreamHook = () => {
    streamObject: MediaStream | null;
    error: string;
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
    const [error, setError] = useState<string>("");
    const supportsCameraAccess = browserSupportsCameraAccess();

    const cleanupStreamObject = useCallback(() => {
        streamObject?.getVideoTracks().forEach(track => track.stop());
    }, [streamObject]);

    useEffect(() => {
        let stream: MediaStream | null;
        async function getStream(): Promise<void> {
            try {
                stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
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
        if (supportsCameraAccess && !streamObject) {
            getStream();
        } else {
            return () => {
                cleanupStreamObject();
            };
        }
    }, [supportsCameraAccess, streamObject, cleanupStreamObject]);

    return { streamObject, cleanupStreamObject, error };
};
