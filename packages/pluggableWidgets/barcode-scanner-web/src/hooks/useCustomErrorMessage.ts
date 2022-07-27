import { Exception } from "@zxing/library/cjs";
import { useState, useCallback } from "react";

type ErrorCb<E extends Error = Error> = (error: E) => void;

type UseCustomErrorMessageHook = () => [string | null, ErrorCb];

function getErrorMessage<E extends Error>(error: E): string | null {
    // Error comes from `zxing`
    if (error instanceof Exception) {
        return "Error in barcode scanner: an unexpected error occurred while detecting a barcode in the camera media stream.";
    }

    if (error.name === "NotFoundError") {
        return "Error in barcode scanner: no camera media devices were found.";
    }

    // Ignore error if user restricted camera access
    if (error.name === "NotAllowedError") {
        return null;
    }

    // Anything else will be a DOMException that we show as media stream error
    return "Error in barcode scanner: an unexpected error occurred while retrieving the camera media stream.";
}

export const useCustomErrorMessage: UseCustomErrorMessageHook = () => {
    const [message, setMessage] = useState<string | null>(null);
    const setError = useCallback<ErrorCb>(error => {
        setMessage(getErrorMessage(error));
    }, []);
    return [message, setError];
};
