import { useEffect } from "react";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";

const hints = new Map();
const formats = Object.values(BarcodeFormat).filter(format => typeof format !== "string") as BarcodeFormat[];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

type CodeScannerHook = (
    streamObject: MediaStream | null,
    videoElement: HTMLVideoElement | null | undefined,
    onDetect: ((data: string) => void) | undefined
) => void;

export const useCodeScanner: CodeScannerHook = (streamObject, videoElement, onDetect) => {
    useEffect(() => {
        const browserReader = new BrowserMultiFormatReader(hints);
        async function check(stream: MediaStream, element: HTMLVideoElement): Promise<void> {
            try {
                const result = await browserReader.decodeOnceFromStream(stream, element);
                onDetect?.(result.getText());
            } catch (e) {
                // TODO: handle error case
                console.log("something went wrong", e);
            }
        }
        if (streamObject && videoElement) {
            check(streamObject, videoElement);
            // return () => {
            //     browserReader.reset();
            // };
        }
    }, [streamObject, videoElement, onDetect]);
};
