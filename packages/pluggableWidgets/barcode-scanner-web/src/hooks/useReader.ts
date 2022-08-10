import { useEffect, useRef, RefObject } from "react";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library/cjs";
import { useEventCallback } from "@mendix/piw-utils-internal";

const hints = new Map();
// RSS_Expanded is not production ready yet.
const exclusions = new Set([BarcodeFormat.RSS_EXPANDED]);
// `BarcodeFormat` is a TypeScript enum. Calling `Object.values` on it returns an array of string and ints, we only want the latter.
const formats = Object.values(BarcodeFormat)
    .filter((format): format is BarcodeFormat => typeof format !== "string")
    .filter(format => !exclusions.has(format));
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

const mediaStreamConstraints: MediaStreamConstraints = {
    audio: false,
    video: {
        facingMode: "environment",
        width: { min: 1280, ideal: 1920, max: 2560 },
        height: { min: 720, ideal: 1080, max: 1440 }
    }
};

type UseReaderHook = (args: {
    onSuccess?: (data: string) => void;
    onError?: (e: Error) => void;
}) => RefObject<HTMLVideoElement>;

export const useReader: UseReaderHook = args => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const onSuccess = useEventCallback(args.onSuccess);
    const onError = useEventCallback(args.onError);

    function setup(): (() => void) | void {
        if (!videoRef.current) {
            return;
        }
        let isCanceled = false;
        let reader: BrowserMultiFormatReader | null = null;
        const elt = videoRef.current;

        const cleanup = (): void => {
            if (!isCanceled && reader) {
                reader.reset();
                reader = null;
                isCanceled = true;
            }
        };

        const decodeFromReader = (): void => {
            const fn = async (): Promise<void> => {
                reader = new BrowserMultiFormatReader(hints, 2000);
                try {
                    const result = await reader.decodeOnceFromConstraints(mediaStreamConstraints, elt);
                    onSuccess(result.getText());
                } catch (e) {
                    console.log(e.message);
                    if (!isCanceled && onError) {
                        onError(e);
                    }
                } finally {
                    cleanup();
                }
            };
            fn();
        };

        decodeFromReader();

        return cleanup;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(setup, []);

    return videoRef;
};
