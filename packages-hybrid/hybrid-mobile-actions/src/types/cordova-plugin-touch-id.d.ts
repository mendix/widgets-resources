interface Window {
    plugins?: WindowPlugins;
}

interface WindowPlugins {
    touchid?: TouchID;
}

interface TouchID {
    isAvailable(available: (type: string) => void, notAvailable: (message: string) => void);
    verifyFingerprint(message: string, success: (message: string) => void, error: (message: string) => void);
}
