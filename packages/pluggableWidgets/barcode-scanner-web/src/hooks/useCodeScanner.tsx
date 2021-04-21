import { useEffect, useRef, useState } from "react";
import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";

const hints = new Map();
const formats = Object.values(BarcodeFormat).filter(format => typeof format !== "string") as BarcodeFormat[];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

type CodeScannerHook = (
    streamObject: MediaStream | null,
    videoElement: HTMLVideoElement | null
) => { codeResult: string | null; error: "ERROR_CODE_SCANNER" | null };

export const useCodeScanner: CodeScannerHook = (streamObject, videoElement) => {
    const [codeResult, setCodeResult] = useState<string | null>(null);
    const [error, setError] = useState<"ERROR_CODE_SCANNER" | null>(null);

    useEffect(() => {
        let isCanceled = false;
        async function check(stream: MediaStream, element: HTMLVideoElement): Promise<void> {
            try {
                const browserReader = new BrowserMultiFormatReader(hints);
                const result = await browserReader.decodeOnceFromStream(stream, element);
                if (!isCanceled) {
                    setCodeResult(result.getText());
                }
            } catch (e) {
                setError("ERROR_CODE_SCANNER");
            }
        }
        if (streamObject && videoElement) {
            check(streamObject, videoElement);
        }
        return () => {
            isCanceled = true;
        };
    }, [streamObject, videoElement]);
    useWhyDidYouUpdate("useCodeScanner", { streamObject, videoElement });
    return { codeResult, error };
};

// Hook
function useWhyDidYouUpdate(name: string, props: Record<string, any>): void {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef<Record<string, any>>({});
    useEffect(() => {
        if (previousProps.current) {
            // Get all keys from previous and current props
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            // Use this object to keep track of changed props
            const changesObj: Record<string, any> = {};
            // Iterate through keys
            allKeys.forEach(key => {
                // If previous is different from current
                if (previousProps.current[key] !== props[key]) {
                    // Add to changesObj
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    };
                }
            });
            // If changesObj not empty then output to console
            if (Object.keys(changesObj).length) {
                console.log("[why-did-you-update]", name, changesObj);
            }
        }
        // Finally update previousProps with current props for next hook call
        previousProps.current = props;
    });
}
