interface Navigator {
    readonly product?: "ReactNative";
    share?: (data: { url?: string; text?: string; title?: string }) => Promise<void>;
}

interface Geolocation {
    requestAuthorization?: () => void;
}
