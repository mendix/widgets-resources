interface Window {
    readonly cordova?: object;
    readonly plugins?: {
        readonly socialsharing?: CordovaSharing;
    };
}

interface CordovaSharing {
    shareWithOptions(
        options: CordovaSharingOptions,
        success: (result: { completed: boolean; app: string }) => void,
        error: (error: string) => void
    ): void;
}

interface CordovaSharingOptions {
    message?: string;
    subject?: string;
    url?: string;
}
